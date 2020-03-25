import React from 'react';
import styled from 'styled-components';
import { Toolbar, IconButton } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import SearchNoteIcon from '@material-ui/icons/Search';
import { Note } from 'services/storage/notes';
import AddNoteDialog from './MenuItem/AddNoteDialog';
import RemoveNoteDialog from './MenuItem/RemoveNoteDialog';
import { NotesSortOrder } from './NotesSortConditionField';
import SortNotesDialog from './MenuItem/SortNotesDialog';

interface NoteViewMenuProps {
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  sortNotes: (order: NotesSortOrder) => void;
  defaultNotesSortOrder: NotesSortOrder;
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
  sortNotes,
  defaultNotesSortOrder,
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
      <SortNotesDialog
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
        size="large"
        selectedGenreId={selectedGenreId}
      />
      <IconButton>
        <SearchNoteIcon fontSize="large" />
      </IconButton>
    </StyledToolBar>
  );
};

export default NoteViewMenu;
