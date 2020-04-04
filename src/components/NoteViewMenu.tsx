import React from 'react';
import AddNoteDialog from './MenuItem/AddNoteDialog';
import RemoveNoteDialog from './MenuItem/RemoveNoteDialog';
import { NotesSortOrder } from './NotesSortConditionField';
import SortNotesDialog from './MenuItem/SortNotesDialog';
import MoveNotesDialog from './MenuItem/MoveNotesDialog';

interface NoteViewMenuProps {
  sortNotes: (order: NotesSortOrder) => void;
  defaultNotesSortOrder: NotesSortOrder;
  selectedGenreId: string;
  selectedNoteIds: string[];
}

const NoteViewMenu: React.FC<NoteViewMenuProps> = ({
  sortNotes,
  defaultNotesSortOrder,
  selectedGenreId,
  selectedNoteIds,
}) => {
  return (
    <>
      <AddNoteDialog size="large" selectedGenreId={selectedGenreId} />
      <RemoveNoteDialog size="large" selectedNoteIds={selectedNoteIds} />
      <MoveNotesDialog selectedNotesIds={selectedNoteIds} size="large" />
      <SortNotesDialog
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
        size="large"
        selectedGenreId={selectedGenreId}
      />
    </>
  );
};

export default NoteViewMenu;
