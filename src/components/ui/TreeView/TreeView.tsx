import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import TreeViewContext from './TreeViewContext';

const Tree = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  background-color: ${props => props.theme.palette.primary.main};
  margin-top: 0;
  margin-bottom: 0;
`;

interface TreeViewProps {
  className?: string;
  onNodeSelect?: (id: string) => void;
}

const TreeView: React.FC<TreeViewProps> = ({
  children,
  className,
  onNodeSelect,
}) => {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');

  // 最後にハンドラによって選択されたid
  const lastSelectedId = useRef('');

  const select = useCallback(
    (id: string) => {
      setSelectedId(id);
      if (onNodeSelect) onNodeSelect(id);
    },
    [onNodeSelect],
  );

  // TreeItemに渡す
  const selectNode = useCallback(
    (id: string) => {
      if (selectedId !== id) {
        select(id);
        lastSelectedId.current = id;
      } else {
        select('');
        lastSelectedId.current = '';
      }
    },
    [select, selectedId],
  );

  const expandNode = useCallback(
    (id: string) => {
      let newIds = [...expandedIds, id];
      if (expandedIds.find(i => i === id)) {
        newIds = expandedIds.filter(i => i !== id);
      }
      setExpandedIds(newIds);
    },
    [expandedIds],
  );

  const addNode = useCallback(
    (id: string) => {
      if (selectedId === '' && lastSelectedId.current === id) {
        select(id);
      }
    },
    [select, selectedId],
  );

  const removeNode = useCallback(
    (id: string) => {
      if (selectedId === id) {
        select('');
      }
    },
    [select, selectedId],
  );

  const handleTreeClick = useCallback(() => {
    select('');
  }, [select]);

  return (
    <TreeViewContext.Provider
      value={{
        selectedId,
        selectNode,
        expandedIds,
        expandNode,
        addNode,
        removeNode,
      }}
    >
      <Tree onClick={handleTreeClick} className={className}>
        {children}
      </Tree>
    </TreeViewContext.Provider>
  );
};

export default TreeView;
