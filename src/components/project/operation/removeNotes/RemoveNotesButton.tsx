import React, { forwardRef, PropsWithChildren } from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import { useNotesContext } from '../../../../context/NotesContext';
import { OperationDialog } from '../OperationDialog';
import { RemoveNotesDialogContent } from './RemoveNotesDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

type Props = {
  disabled?: boolean;
  targetNoteIds: string[];
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function RemoveNoteDialog({ disabled, targetNoteIds, size, tabIndex }, ref) {
    const { isOpen, open, close } = useDialog(false);
    const { removeNotes } = useNotesContext();

    const handleClick = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      open();
    };

    const handleDone = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      removeNotes(targetNoteIds);
      close();
    };

    const handleCancel = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      close();
    };

    return (
      <>
        <ActivatorButton
          ref={ref}
          disabled={disabled}
          tooltipText="メモの削除"
          onClick={handleClick}
          tabIndex={tabIndex}
          data-testid="activatorButton"
        >
          <DeleteNoteIcon fontSize={size} />
        </ActivatorButton>
        <OperationDialog
          open={isOpen}
          onClose={close}
          data-testid="removeNoteDialog"
        >
          <DialogTitle>メモの削除</DialogTitle>
          <RemoveNotesDialogContent />
          <DialogActions>
            <Button onClick={handleDone} data-testid="doneButton">
              <Typography color="textSecondary">削除</Typography>
            </Button>
            <Button onClick={handleCancel} data-testid="cancelButton">
              <Typography color="textSecondary">中止</Typography>
            </Button>
          </DialogActions>
        </OperationDialog>
      </>
    );
  },
);

export const RemoveNotesButton = Component;
