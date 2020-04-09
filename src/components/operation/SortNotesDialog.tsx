import React, { useState } from 'react';
import { DialogTitle, DialogContent, SvgIconProps } from '@material-ui/core';
import SortNoteIcon from '@material-ui/icons/Sort';
import NotesSortConditionField, {
  NotesSortOrder,
} from '../NotesSortConditionFields';
import OperationDialog from './OperationDialog';

interface SortNotesDialogProps {
  sort: (order: NotesSortOrder) => void;
  defaultSortOrder: NotesSortOrder;
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const SortNotesDialog: React.FC<SortNotesDialogProps> = ({
  sort,
  defaultSortOrder,
  selectedGenreId,
  size,
}) => {
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const sortNotes = () => {
    sort(sortOrder);
  };

  const setDefaultSortOrder = () => {
    setSortOrder(defaultSortOrder);
  };

  const changeSortTargetField = (
    targetField: NotesSortOrder['targetField'],
  ) => {
    setSortOrder(state => ({ ...state, targetField }));
  };

  const changeSortOrder = (order: NotesSortOrder['order']) => {
    setSortOrder(state => ({ ...state, order }));
  };

  return (
    <OperationDialog
      tooltipText="ノートを並び替える"
      activatorIcon={<SortNoteIcon fontSize={size} />}
      activatorDisabled={selectedGenreId.length === 0}
      doneText="並び替え"
      onDone={sortNotes}
      onOpen={setDefaultSortOrder}
    >
      <DialogTitle>ノートの並び替え</DialogTitle>
      <DialogContent>
        <NotesSortConditionField
          notesSortOrder={sortOrder}
          onChangeTargetField={changeSortTargetField}
          onChangeOrder={changeSortOrder}
        />
      </DialogContent>
    </OperationDialog>
  );
};

export default SortNotesDialog;
