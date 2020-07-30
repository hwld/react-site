import React from 'react';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import { AddNoteDialog } from '../../operation/AddNoteDialog';
import { RemoveNoteDialog } from '../../operation/RemoveNoteDialog';
import { MoveNotesDialog } from '../../operation/MoveNotesDialog';
import { SortNotesDialog } from '../../operation/SortNotesDialog';

interface NotesViewMenuProps {
  sortNotes: (order: NotesSortOrder) => void;
  defaultNotesSortOrder: NotesSortOrder;
  selectedGenreIds: string[];
  selectedNoteIds: string[];
}

const NotesViewMenu: React.FC<NotesViewMenuProps> = ({
  sortNotes,
  defaultNotesSortOrder,
  selectedGenreIds,
  selectedNoteIds,
}) => {
  return (
    <>
      <AddNoteDialog
        disabled={selectedGenreIds.length !== 1}
        genreId={selectedGenreIds[0] || ''}
      />
      <RemoveNoteDialog
        disabled={selectedNoteIds.length === 0}
        targetNoteIds={selectedNoteIds}
      />
      <MoveNotesDialog
        disabled={selectedGenreIds.length === 0}
        sourceNoteIds={selectedNoteIds}
      />
      <SortNotesDialog
        disabled={selectedGenreIds.length === 0}
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
      />
    </>
  );
};

export { NotesViewMenu };
