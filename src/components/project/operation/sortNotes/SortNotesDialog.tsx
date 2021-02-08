import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { NotesSortOrder } from '../../../../services/notes';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { NotesSortConditionField } from '../../ui/NotesSortConditionFields';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  sortOrder: NotesSortOrder;
  onChangeSortTargetField: (targetField: NotesSortOrder['targetField']) => void;
  onChangeSortOrder: (order: NotesSortOrder['order']) => void;
  onSortNotes: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  sortOrder,
  onChangeSortTargetField,
  onChangeSortOrder,
  onSortNotes,
  onCancel,
}) => {
  return (
    <OperationDialog open={isOpen} onClose={onClose}>
      <DialogTitle>メモの並び替え</DialogTitle>

      <DialogContent>
        <NotesSortConditionField
          notesSortOrder={sortOrder}
          onChangeTargetField={onChangeSortTargetField}
          onChangeOrder={onChangeSortOrder}
        />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onCancel} />
        <ApplyButton text="並び替え" onClick={onSortNotes} />
      </DialogActions>
    </OperationDialog>
  );
};

export const SortNotesDialog = Component;
