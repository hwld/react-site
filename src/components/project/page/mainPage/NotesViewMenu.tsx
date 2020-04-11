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
  const { isMobile } = useContext(MobileContext);

  return (
    <>
      <AddNoteDialog
        size={isMobile ? 'default' : 'large'}
        selectedGenreId={selectedGenreId}
      />
      <RemoveNoteDialog
        size={isMobile ? 'default' : 'large'}
        selectedNoteIds={selectedNoteIds}
      />
      <MoveNotesDialog
        size={isMobile ? 'default' : 'large'}
        selectedNotesIds={selectedNoteIds}
      />
      <SortNotesDialog
        size={isMobile ? 'default' : 'large'}
        defaultSortOrder={defaultNotesSortOrder}
        sort={sortNotes}
        selectedGenreId={selectedGenreId}
      />
    </>
  );
};

export default NoteViewMenu;
