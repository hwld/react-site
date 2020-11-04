import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import SortNoteIcon from '@material-ui/icons/Sort';
import { OperationDialog } from '../OperationDialog';
import { NotesSortOrder } from '../../../../services/notes';
import { SortNotesDialogContent } from './SortNotesDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

type Props = {
  sort: (order: NotesSortOrder) => void;
  defaultSortOrder?: NotesSortOrder;
  disabled?: boolean;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({
  sort,
  defaultSortOrder = { targetField: 'createdAt', order: 'asc' },
  disabled,
  size,
}) => {
  const { isOpen, open, close } = useDialog(false);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setSortOrder(defaultSortOrder);
    open();
  };

  const handleDone = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    sort(sortOrder);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
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
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="ノートの並び替え"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <SortNoteIcon fontSize={size} />
      </ActivatorButton>
      <OperationDialog
        open={isOpen}
        onClose={close}
        data-testid="sortNotesDialog"
      >
        <DialogTitle>ノートの並び替え</DialogTitle>
        <SortNotesDialogContent
          sortOrder={sortOrder}
          onChangeSortTargetField={changeSortTargetField}
          onChangeSortOrder={changeSortOrder}
        />
        <DialogActions>
          <Button onClick={handleDone} data-testid="doneButton">
            <Typography color="textSecondary">並び替え</Typography>
          </Button>
          <Button onClick={handleCancel} data-testid="cancelButton">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </OperationDialog>
    </>
  );
};

export const SortNotesButton = Component;
