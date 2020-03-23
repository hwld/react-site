import React from 'react';
import styled from 'styled-components';
import { Toolbar, IconButton } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import SortNoteIcon from '@material-ui/icons/Sort';
import SearchNoteIcon from '@material-ui/icons/Search';
import { Note } from 'services/storage/notes';
import AddNoteDialog from './AddNoteDialog';
import RemoveNoteDialog from './RemoveNoteDialog';

interface NoteViewMenuProps {
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  className?: string;
  selectedGenreId: string;
  selectedNoteIds: string[];
}

const StyledToolBar = styled(Toolbar)`
  display: flex;
  justify-content: center;
`;

const NoteViewMenu: React.FC<NoteViewMenuProps> = ({
  addNote,
  removeNote,
  className,
  selectedGenreId,
  selectedNoteIds,
}) => {
  return (
    <StyledToolBar className={className}>
      <AddNoteDialog
        add={addNote}
        size="large"
        selectedGenreId={selectedGenreId}
      />
      <RemoveNoteDialog
        remove={removeNote}
        size="large"
        selectedNoteIds={selectedNoteIds}
      />
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
