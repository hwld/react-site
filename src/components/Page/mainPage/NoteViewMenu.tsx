import React from 'react';
import AddNoteDialog from 'components/menuItem/AddNoteDialog';
import RemoveNoteDialog from 'components/menuItem/RemoveNoteDialog';
import SortNotesDialog from 'components/menuItem/SortNotesDialog';
import MoveNotesDialog from 'components/menuItem/MoveNotesDialog';
import { NotesSortOrder } from '../../NotesSortConditionField';

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
