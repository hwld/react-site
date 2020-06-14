import React from 'react';
import styled from 'styled-components';
import TreeItem from '../../ui/TreeView/TreeItem';

type GenreTreeItemProps = {
  genreId: string;
  genreName: string;
};

const DropLayer = styled.div``;

const GenreTreeItem: React.FC<GenreTreeItemProps> = ({
  children,
  genreId,
  genreName,
}) => {
  return (
    <DropLayer>
      <TreeItem nodeId={genreId} label={genreName}>
        {children}
      </TreeItem>
    </DropLayer>
  );
};

export default GenreTreeItem;
