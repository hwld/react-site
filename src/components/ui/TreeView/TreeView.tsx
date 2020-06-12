import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import TreeViewContext, { TreeNode } from './TreeViewContext';
import { ItemTypes } from './ItemTypes';

const Tree = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  background-color: ${props => props.theme.palette.primary.main};
  margin-top: 0;
  margin-bottom: 0;
`;

interface TreeViewProps {
  className?: string;
  multiple?: boolean;
  defaultSelectedIds?: string[];
  onNodeSelect?: (id: string[]) => void;
  onDrop?: (sourceIds: string[], targetId: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  children,
  className,
  multiple = false,
  defaultSelectedIds = [],
  onNodeSelect = () => {},
  onDrop = () => {},
}) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedIds, setSelectedIds] = useState(defaultSelectedIds);

  // 内部の選択状態と外部の選択状態を同時に設定する
  const setSelectedIdsWithExternal = useCallback(
    (ids: string[]) => {
      setSelectedIds(ids);
      onNodeSelect(ids);
    },
    [onNodeSelect],
  );

  // 選択されているノードが存在しない場合、選択状態から外す.
  useEffect(() => {
    const nodeIds = nodes.map(node => node.id);
    selectedIds.forEach(selectedId => {
      if (!nodeIds.includes(selectedId)) {
        setSelectedIdsWithExternal(selectedIds.filter(id => id !== selectedId));
      }
    });
  }, [nodes, selectedIds, setSelectedIdsWithExternal]);

  const [, drop] = useDrop({
    accept: ItemTypes.TreeItem,
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(selectedIds, '');
      }
    },
  });

  const addNodeId = useCallback((id: string) => {
    setNodes(state => [...state, { id, expanded: true, childrenId: [] }]);
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

  const removeNodeId = useCallback((id: string) => {
    setNodes(state => state.filter(node => node.id !== id));
  }, []);

  const selectIds = useCallback(
    (ids: string[]) => {
      setSelectedIdsWithExternal(ids);
    },
    [setSelectedIdsWithExternal],
  );

  const expandNode = useCallback((id: string) => {
    setNodes(state => {
      return state.map(node => {
        if (node.id === id) {
          return {
            id: node.id,
            expanded: !node.expanded,
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
        expandNode,
        onDrop,
      }}
    >
      <Tree
        onClick={() => {
          setSelectedIdsWithExternal([]);
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
