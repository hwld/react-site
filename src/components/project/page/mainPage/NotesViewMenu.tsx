import React from 'react';
import { AddNoteDialog } from '../../operation/addNote/AddNoteDialog';
import { RemoveNotesDialog } from '../../operation/removeNotes/RemoveNotesDialog';
import { MoveNotesDialog } from '../../operation/moveNotes/MoveNotesDialog';
import { NotesSortOrder } from '../../../../services/notes';
import { UpdateNoteDialog } from '../../operation/updateNote/UpdateNoteDialog';
import { SortNotesDialog } from '../../operation/sortNotes/SortNotesDialog';

interface NotesViewMenuProps {
  sortNotes: (order: NotesSortOrder) => void;
  defaultNotesSortOrder: NotesSortOrder;
  selectedCategoryIds: string[];
  selectedNoteIds: string[];
}

const NotesViewMenu: React.FC<NotesViewMenuProps> = ({
  sortNotes,
  defaultNotesSortOrder,
  selectedCategoryIds,
  selectedNoteIds,
}) => {
  return (
    <>
      <AddNoteDialog
        disabled={selectedCategoryIds.length !== 1}
        categoryId={selectedCategoryIds[0] || ''}
      />
      <RemoveNotesDialog
        disabled={selectedNoteIds.length === 0}
        targetNoteIds={selectedNoteIds}
      />
      <UpdateNoteDialog
        disabled={selectedNoteIds.length !== 1}
        defaultNoteId={selectedNoteIds[0] || ''}
      />
      <MoveNotesDialog
        disabled={selectedNoteIds.length === 0}
        sourceNoteIds={selectedNoteIds}
      />
      <SortNotesDialog
        disabled={selectedCategoryIds.length === 0}
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
      />
    </>
  );
};

export { NotesViewMenu };
