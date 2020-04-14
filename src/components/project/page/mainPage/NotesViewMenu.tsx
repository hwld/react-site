import React, { useContext } from 'react';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import AddNoteDialog from '../../operation/AddNoteDialog';
import RemoveNoteDialog from '../../operation/RemoveNoteDialog';
import MoveNotesDialog from '../../operation/MoveNotesDialog';
import SortNotesDialog from '../../operation/SortNotesDialog';
import MobileContext from '../../../../context/MobileContext';

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
      <AddNoteDialog size="default" selectedGenreId={selectedGenreId} />
      <RemoveNoteDialog size="default" selectedNoteIds={selectedNoteIds} />
      <MoveNotesDialog size="default" selectedNotesIds={selectedNoteIds} />
      <SortNotesDialog
        size="default"
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
        selectedGenreId={selectedGenreId}
      />
    </>
  );
};

export default NoteViewMenu;
