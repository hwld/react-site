import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import TreeViewContext, { TreeNode } from './TreeViewContext';
import { ItemTypes } from '../ItemTypes';

const Tree = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  background-color: ${props => props.theme.palette.primary.main};
  margin-top: 0;
  margin-bottom: 0;
`;

interface TreeViewProps {
  isDrag?: boolean;
  className?: string;
  multiple?: boolean;
  selectedIds?: string[];
  onNodeSelect?: (id: string[]) => void;
  onDrop?: (sourceIds: string[], targetId: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  isDrag = false,
  children,
  className,
  multiple = false,
  selectedIds = [],
  onNodeSelect = () => {},
  onDrop = () => {},
}) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  // 選択状態のItemが削除されたときに、それを除いた選択状態を返す
  // これとonNodeSelectを使って、内部と外部の選択状態の同期をとる.
  // 内部の状態をいちいち用意しているのは、removeNodeの依存リストにpropsを含めたくなかったから.
  const [internalSelectedIds, setInternalSelectedIds] = useState(selectedIds);

  // 内部の選択状態と外部の選択状態の同期
  useEffect(() => {
    if (selectedIds.length !== internalSelectedIds.length) {
      onNodeSelect(internalSelectedIds);
    }
  }, [internalSelectedIds, onNodeSelect, selectedIds]);

  const selectIds = useCallback(
    (ids: string[]) => {
      onNodeSelect(ids);
      setInternalSelectedIds(ids);
    },
    [onNodeSelect],
  );

  const [, drop] = useDrop({
    accept: ItemTypes.TreeItem,
    canDrop: (item, monitor) => {
      return monitor.isOver({ shallow: true });
    },
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(selectedIds, '');
      }
    },
  });

  // TreeItemの初回レンダリング時にだけ動かしたいので、依存しないようにする
  const addNodeId = useCallback((id: string) => {
    setNodes(state => [...state, { id, expanded: true, childrenId: [] }]);
  }, []);

  // TreeItemの破棄の時にだけ動かしたいので、依存しないようにする
  const removeNodeId = useCallback((id: string) => {
    setNodes(state => state.filter(node => node.id !== id));
    setInternalSelectedIds(internalIds =>
      internalIds.filter(internalId => internalId !== id),
    );
  }, []);

  const addNodeChildrenId = useCallback((id: string, childrenId: string[]) => {
    setNodes(state => {
      return [
        ...state.filter(s => s.id !== id),
        ...state
          .filter(s => s.id === id)
          .map(
            (s): TreeNode => ({ id: s.id, expanded: s.expanded, childrenId }),
          ),
      ];
    });
  }, []);

  const setExpanded = useCallback((id: string, isExpand: boolean) => {
    setNodes(state => {
      return state.map(node => {
        if (node.id === id) {
          return {
            id: node.id,
            expanded: isExpand,
            childrenId: node.childrenId,
          };
        }

        return node;
      });
    });
  }, []);

  return (
    <TreeViewContext.Provider
      value={{
        multiple,
        nodes,
        addNodeId,
        addNodeChildrenId,
        removeNodeId,
        selectedIds,
        selectIds,
        setExpanded,
        isDrag,
        onDrop,
      }}
    >
      <Tree
        onClick={() => {
          selectIds([]);
        }}
        className={className}
        ref={drop}
      >
        {children}
      </Tree>
    </TreeViewContext.Provider>
  );
};

export default TreeView;
