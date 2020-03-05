import React from 'react';
import styled from 'styled-components';
import { Toolbar, IconButton } from '@material-ui/core';
import AddGenreIcon from '@material-ui/icons/CreateNewFolder';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import EditGenreIcon from '@material-ui/icons/Edit';

interface GenreViewMenuProps {
  className?: string;
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const GenreViewMenu: React.FC<GenreViewMenuProps> = ({ className }) => {
  return (
    <StyledToolBar className={className}>
      <IconButton>
        <AddGenreIcon fontSize="large" />
      </IconButton>
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
