import React, { useState } from 'react';
import { DialogTitle, DialogContent, SvgIconProps } from '@material-ui/core';
import SortNoteIcon from '@material-ui/icons/Sort';
import {
  NotesSortConditionField,
  NotesSortOrder,
} from '../ui/NotesSortConditionFields';
import { OperationDialog } from './OperationDialog';

type SortNotesDialogProps = {
  sort: (order: NotesSortOrder) => void;
  defaultSortOrder?: NotesSortOrder;
  disabled?: boolean;
  size?: SvgIconProps['fontSize'];
};

const SortNotesDialog: React.FC<SortNotesDialogProps> = ({
  sort,
  defaultSortOrder = { targetField: 'createdAt', order: 'asc' },
  disabled,
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
      activatorDisabled={disabled}
      doneText="並び替え"
      onDone={sortNotes}
      onOpen={setDefaultSortOrder}
      data-testid="sortNotesDialog"
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

export { SortNotesDialog };
