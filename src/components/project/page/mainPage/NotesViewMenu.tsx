import React from 'react';
import { AddNoteDialog } from '../../operation/AddNoteDialog';
import { RemoveNoteDialog } from '../../operation/RemoveNoteDialog';
import { MoveNotesDialog } from '../../operation/MoveNotesDialog';
import { SortNotesDialog } from '../../operation/SortNotesDialog';
import { UpdateNoteDialog } from '../../operation/UpdateNoteDialog';
import { NotesSortOrder } from '../../../../services/notes';

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
      <RemoveNoteDialog
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
