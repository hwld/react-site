import React from 'react';
import { NotesSortOrder } from '../../NotesSortConditionField';
import AddNoteDialog from '../../operation/AddNoteDialog';
import RemoveNoteDialog from '../../operation/RemoveNoteDialog';
import MoveNotesDialog from '../../operation/MoveNotesDialog';
import SortNotesDialog from '../../operation/SortNotesDialog';

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
