import React, { useState } from 'react';
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

  const selectNode = (id: string) => {
    if (selectedId !== id) {
      setSelectedId(id);
      if (onNodeSelect) onNodeSelect(id);
    } else {
      setSelectedId('');
      if (onNodeSelect) onNodeSelect('');
    }
  };

  return (
    <TreeViewContext.Provider value={{ selectedId, selectNode }}>
      <Tree className={className}>{children}</Tree>
    </TreeViewContext.Provider>
  );
};

export default TreeView;
