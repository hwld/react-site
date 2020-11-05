import React from 'react';
import { AddNoteButton } from '../../operation/addNote/AddNoteButton';
import { RemoveNotesButton } from '../../operation/removeNotes/RemoveNotesButton';
import { MoveNotesButton } from '../../operation/moveNotes/MoveNotesButton';
import { NotesSortOrder } from '../../../../services/notes';
import { UpdateNoteButton } from '../../operation/updateNote/UpdateNoteButton';
import { SortNotesButton } from '../../operation/sortNotes/SortNotesButton';

type Props = {
  sortNotes: (order: NotesSortOrder) => void;
  defaultNotesSortOrder: NotesSortOrder;
  selectedCategoryIds: string[];
  selectedNoteIds: string[];
};

const Component: React.FC<Props> = ({
  sortNotes,
  defaultNotesSortOrder,
  selectedCategoryIds,
  selectedNoteIds,
}) => {
  return (
    <>
      <AddNoteButton
        disabled={selectedCategoryIds.length !== 1}
        categoryId={selectedCategoryIds[0] || ''}
      />
      <RemoveNotesButton
        disabled={selectedNoteIds.length === 0}
        targetNoteIds={selectedNoteIds}
      />
      <UpdateNoteButton
        disabled={selectedNoteIds.length !== 1}
        defaultNoteId={selectedNoteIds[0]}
      />
      <MoveNotesButton
        disabled={selectedNoteIds.length === 0}
        sourceNoteIds={selectedNoteIds}
      />
      <SortNotesButton
        disabled={selectedCategoryIds.length === 0}
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
      />
    </>
  );
};

export const NotesViewMenu = Component;
