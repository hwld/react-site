import React, { BaseSyntheticEvent } from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Typography,
  DialogTitle,
} from '@material-ui/core';

type OperationDialogProps = {
  title: string;
  activator: JSX.Element;
  doneText?: string;
  onDone?: () => void;
  doneDisabled?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
  'data-testid'?: string;
};

export const OperationDialog: React.FC<OperationDialogProps> = ({
  children,
  title,
  activator,
  doneText,
  onDone,
  doneDisabled,
  isOpen,
  setIsOpen,
  onClose,
  'data-testid': dataTestId,
}) => {
  const stopPropagation = (event: BaseSyntheticEvent<{}>) => {
    event.stopPropagation();
  };

  const closeDialog = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleDone = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (onDone) onDone();
    closeDialog();
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    closeDialog();
  };

  return (
    <span data-testid={dataTestId}>
      {activator}
      <Dialog
        fullWidth
        open={isOpen}
        onClose={closeDialog}
        maxWidth="sm"
        // ダイアログ外をクリックするとクリックイベントが伝搬してしまうため、ここで防ぐ
        onClick={stopPropagation}
        // ダイアログ内のフォーカスイベントを外に出さない
        onFocus={stopPropagation}
        // ダイアログ内のキーボードイベントを外に出さない
        onKeyDown={stopPropagation}
        data-testid="dialog"
      >
        <DialogTitle>{title}</DialogTitle>
        {children}
        <DialogActions>
          <Button
            disabled={doneDisabled}
            onClick={handleDone}
            variant="contained"
            color="secondary"
            data-testid="doneButton"
          >
            <Typography color="textSecondary">{doneText || '完了'}</Typography>
          </Button>
          <Button
            onClick={handleCancel}
            variant="contained"
            color="secondary"
            data-testid="cancelButton"
          >
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};
