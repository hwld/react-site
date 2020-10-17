import React, {
  useState,
  PropsWithChildren,
  forwardRef,
  BaseSyntheticEvent,
} from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  Typography,
  DialogTitle,
} from '@material-ui/core';
import { IconButton } from '../../ui/IconButton';

type OperationDialogProps = {
  title: string;
  activatorDisabled?: boolean;
  activatorIcon: JSX.Element;
  doneText?: string;
  onDone?: () => void;
  doneDisabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  'data-testid'?: string;
  tabIndex?: number;
};

export const OperationDialog = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<OperationDialogProps>
>(function OperationDialog(
  {
    children,
    title,
    activatorIcon,
    activatorDisabled,
    doneText,
    onDone,
    doneDisabled,
    onOpen,
    onClose,
    'data-testid': dataTestId,
    tabIndex,
  },
  ref,
) {
  const [isOpen, setIsOpen] = useState(false);

  const stopPropagation = (event: BaseSyntheticEvent<{}>) => {
    event.stopPropagation();
  };

  const closeDialog = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const openDialog = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  const handleClickActivator = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    openDialog();
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
      <IconButton
        ref={ref}
        disabled={activatorDisabled}
        tooltipText={title}
        onClick={handleClickActivator}
        tabIndex={tabIndex}
        data-testid="activatorButton"
      >
        {activatorIcon}
      </IconButton>
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
});
