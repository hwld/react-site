import React from 'react';
import styled from 'styled-components';
import TreeItem from '../../ui/TreeView/TreeItem';

type GenreTreeItemProps = {
  nodeId: string;
  genreName: string;
};

const DropLayer = styled.div``;

const GenreTreeItem: React.FC<GenreTreeItemProps> = ({
  children,
  nodeId,
  genreName,
}) => {
  return (
    <DropLayer>
      <TreeItem nodeId={nodeId} label={genreName}>
        {children}
      </TreeItem>
    </DropLayer>
  );
};

export default GenreTreeItem;
