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
  multiple,
  defaultSelectedIds = [],
  onNodeSelect,
  onDrop,
}) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [selectedIds, setSelectedIds] = useState(defaultSelectedIds);

  // 内部の選択状態と外部の選択状態を同時に設定する
  const setSelectedIdsWithExternal = useCallback(
    (ids: string[]) => {
      setSelectedIds(ids);
      if (onNodeSelect) onNodeSelect(ids);
    },
    [onNodeSelect],
  );

  // 選択されているノードが存在しない場合、選択状態から外す.
  useEffect(() => {
    const nodeIds = nodes.map(node => node.id);
    selectedIds.forEach(selectedIdNew => {
      if (!nodeIds.includes(selectedIdNew)) {
        setSelectedIdsWithExternal(
          selectedIds.filter(id => id !== selectedIdNew),
        );
      }
    });
  }, [nodes, selectedIds, setSelectedIdsWithExternal]);

  const [, drop] = useDrop({
    accept: ItemTypes.TreeItem,
    drop: (item, monitor) => {
      if (!monitor.didDrop() && onDrop) onDrop(selectedIds, '');
    },
  });

  const addNode = useCallback((id: string) => {
    setNodes(state => [...state, { id, expanded: false }]);
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes(state => state.filter(node => node.id !== id));
  }, []);

  const selectIds = useCallback(
    (id: string, withCtrKey: boolean) => {
      if (withCtrKey && multiple) {
        setSelectedIdsWithExternal([...selectedIds, id]);
      } else {
        setSelectedIdsWithExternal([id]);
      }
    },
    [multiple, selectedIds, setSelectedIdsWithExternal],
  );

  const deselectIds = useCallback(
    (id: string, withCtrKey: boolean) => {
      if (withCtrKey && multiple) {
        setSelectedIdsWithExternal(
          selectedIds.filter(selectedId => selectedId !== id),
        );
      } else {
        setSelectedIdsWithExternal([]);
      }
    },
    [multiple, selectedIds, setSelectedIdsWithExternal],
  );

  const changeSelectedIds = useCallback(
    (id: string, withCtrKey: boolean) => {
      // 選択されていないノードが指定された.
      if (!selectedIds.includes(id)) {
        selectIds(id, withCtrKey);
      } else {
        deselectIds(id, withCtrKey);
      }
    },
    [deselectIds, selectIds, selectedIds],
  );

  const expandNode = useCallback((id: string) => {
    setNodes(state => {
      return state.map(node => {
        if (node.id === id) return { id: node.id, expanded: !node.expanded };

        return node;
      });
    });
  }, []);

  return (
    <TreeViewContext.Provider
      value={{
        nodes,
        addNode,
        removeNode,
        selectedIds,
        changeSelectedIds,
        expandNode,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onDrop: onDrop || (() => {}),
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
