import React from 'react';
import styled from 'styled-components';
import { Toolbar, IconButton } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import SortNoteIcon from '@material-ui/icons/Sort';
import SearchNoteIcon from '@material-ui/icons/Search';
import AddNoteMenuItem from './AddNoteMenuItem';
import RemoveNoteMenuItem from './RemoveNoteMenuItem';

interface NoteViewMenuProps {
  className?: string;
  selectedGenreId: string;
  selectedNoteIds: string[];
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const NoteViewMenu: React.FC<NoteViewMenuProps> = ({
  className,
  selectedGenreId,
  selectedNoteIds,
}) => {
  return (
    <StyledToolBar className={className}>
      <AddNoteMenuItem size="large" selectedGenreId={selectedGenreId} />
      <RemoveNoteMenuItem size="large" selectedNoteIds={selectedNoteIds} />
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
