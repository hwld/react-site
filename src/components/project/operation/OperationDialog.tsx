import React, {
  useState,
  PropsWithChildren,
  forwardRef,
  BaseSyntheticEvent,
} from 'react';
import styled from 'styled-components';
import { Dialog, DialogActions, Button, Typography } from '@material-ui/core';
import { IconButton } from '../../ui/IconButton';

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background: ${props => props.theme.palette.primary.main};
  }
`;

type OperationDialogProps = {
  activatorDisabled?: boolean;
  activatorIcon: JSX.Element;
  doneText?: string;
  onDone?: () => void;
  doneDisabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  tooltipText: string;
  'data-testid'?: string;
  tabIndex?: number;
};

export const OperationDialog = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<OperationDialogProps>
>(function OperationDialog(
  {
    children,
    activatorIcon,
    activatorDisabled,
    doneText,
    onDone,
    doneDisabled,
    onOpen,
    onClose,
    tooltipText,
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
        tooltipText={tooltipText}
        onClick={handleClickActivator}
        tabIndex={tabIndex}
        data-testid="activatorButton"
        icon={activatorIcon}
      />
      <StyledDialog
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
      </StyledDialog>
    </span>
  );
});
