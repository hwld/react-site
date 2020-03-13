import React, { useState, useEffect, useCallback } from 'react';
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
  const [selectedId, setSelectedId] = useState('');
  const [nodeIds, setNodeIds] = useState<string[]>([]);

  useEffect(() => {
    if (onNodeSelect) onNodeSelect(selectedId);
  }, [onNodeSelect, selectedId]);

  useEffect(() => {
    if (!nodeIds.includes(selectedId)) {
      setSelectedId('');
    }
  }, [nodeIds, selectedId]);

  const setNodeId = useCallback((id: string) => {
    setNodeIds(ids => [...ids, id]);
  }, []);

  const unsetNodeId = useCallback((id: string) => {
    setNodeIds(Ids => Ids.filter(nodeId => nodeId !== id));
  }, []);

  const selectNode = useCallback(
    (id: string) => {
      if (selectedId !== id) {
        setSelectedId(id);
      } else {
        setSelectedId('');
      }
    },
    [selectedId],
  );

  return (
    <TreeViewContext.Provider
      value={{ selectedId, selectNode, setNodeId, unsetNodeId }}
    >
      <Tree className={className}>{children}</Tree>
    </TreeViewContext.Provider>
  );
};

export default TreeView;
