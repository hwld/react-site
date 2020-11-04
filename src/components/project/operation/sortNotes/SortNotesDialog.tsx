import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { NotesSortOrder } from '../../../../services/notes';
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
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="sortNotesDialog"
    >
      <DialogTitle>ノートの並び替え</DialogTitle>
      <DialogContent>
        <NotesSortConditionField
          notesSortOrder={sortOrder}
          onChangeTargetField={onChangeSortTargetField}
          onChangeOrder={onChangeSortOrder}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSortNotes} data-testid="doneButton">
          <Typography color="textSecondary">並び替え</Typography>
        </Button>
        <Button onClick={onCancel} data-testid="cancelButton">
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const SortNotesDialog = Component;
