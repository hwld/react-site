import React from 'react';
import styled from 'styled-components';
import { Toolbar, IconButton } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import MoveNoteIcon from '@material-ui/icons/Forward';
import SortNoteIcon from '@material-ui/icons/Sort';
import SearchNoteIcon from '@material-ui/icons/Search';
import AddNoteMenuItem from './AddNoteMenuItem';

interface NoteViewMenuProps {
  className?: string;
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const NoteViewMenu: React.FC<NoteViewMenuProps> = ({ className }) => {
  return (
    <StyledToolBar className={className}>
      <AddNoteMenuItem />
      <IconButton>
        <DeleteNoteIcon fontSize="large" />
      </IconButton>
      <IconButton>
        <MoveNoteIcon fontSize="large" />
      </IconButton>
      <IconButton>
        <SortNoteIcon fontSize="large" />
      </IconButton>
      <IconButton>
        <SearchNoteIcon fontSize="large" />
      </IconButton>
    </StyledToolBar>
  );
};

export default NoteViewMenu;
