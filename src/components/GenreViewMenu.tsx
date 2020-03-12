import React from 'react';
import styled from 'styled-components';
import { Toolbar, IconButton } from '@material-ui/core';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import EditGenreIcon from '@material-ui/icons/Edit';
import AddGenreMenuItem from './AddGenreMenuItem';

interface GenreViewMenuProps {
  selectedGenreId: string;
  className?: string;
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({
  className,
  selectedGenreId,
}) => {
  return (
    <StyledToolBar className={className}>
      <AddGenreMenuItem size="large" selectedGenreId={selectedGenreId} />
      <IconButton>
        <DeleteGenreIcon fontSize="large" />
      </IconButton>
      <IconButton>
        <EditGenreIcon fontSize="large" />
      </IconButton>
    </StyledToolBar>
  );
};

export default GenreViewMenu;
