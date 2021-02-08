import React from 'react';
import { NotesSortOrder } from '../../../../services/notes';
import { OpenSortNotesDialogButton } from '../../operation/sortNotes/OpenSortNotesDialogButton';
import { OpenRemoveNotesDialogButton } from '../../operation/removeNotes/OpenRemoveNotesDialog';
import { OpenAddNoteDialogButton } from '../../operation/addNote/OpenAddNoteDialogButton';
import { OpenMoveNotesDialogButton } from '../../operation/moveNotes/OpenMoveNotesDialogButton';
import { OpenUpdateNoteDialogButton } from '../../operation/updateNote/OpenUpdateNoteDialogButton';

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
      <OpenAddNoteDialogButton
        disabled={selectedCategoryIds.length !== 1}
        categoryId={selectedCategoryIds[0] || ''}
      />
      <OpenRemoveNotesDialogButton
        disabled={selectedNoteIds.length === 0}
        targetNoteIds={selectedNoteIds}
      />
      <OpenUpdateNoteDialogButton
        disabled={selectedNoteIds.length !== 1}
        defaultNoteId={selectedNoteIds[0]}
      />
      <OpenMoveNotesDialogButton
        disabled={selectedNoteIds.length === 0}
        sourceNoteIds={selectedNoteIds}
      />
      <OpenSortNotesDialogButton
        disabled={selectedCategoryIds.length === 0}
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
      />
    </>
  );
};

export const NotesViewMenu = Component;
