import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  IconButton,
  DialogActions,
  Button,
  Tooltip,
  Typography,
} from '@material-ui/core';

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background: ${props => props.theme.palette.primary.main};
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: 10px;
  background-color: ${props => props.theme.palette.secondary.main};

  &:hover {
    background-color: ${props => props.theme.palette.secondary.dark};
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
};

const OperationDialog: React.FC<OperationDialogProps> = ({
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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const stopPropagation = (event: React.MouseEvent<{}>) => {
    event.stopPropagation();
  };

  const openDialog = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  const closeDialog = () => {
    setIsOpen(false);
    if (onClose) onClose();
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

  // ToolTipの子コンポーネントにdisable属性をつけるとエラーが出るのでifで分岐させる
  const activator = () => {
    if (activatorDisabled)
      return (
        <StyledIconButton disabled data-testid="activatorButton">
          {activatorIcon}
        </StyledIconButton>
      );

    return (
      <Tooltip title={<Typography>{tooltipText}</Typography>}>
        <StyledIconButton
          onClick={handleClickActivator}
          data-testid="activatorButton"
        >
          {activatorIcon}
        </StyledIconButton>
      </Tooltip>
    );
  };

  return (
    <span data-testid={dataTestId}>
      {activator()}
      <StyledDialog
        fullWidth
        open={isOpen}
        onClose={closeDialog}
        maxWidth="sm"
        // ダイアログ外をクリックするとクリックイベントが伝搬してしまうため、ここで防ぐ
        onClick={stopPropagation}
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
            {doneText || '完了'}
          </Button>
          <Button
            onClick={handleCancel}
            variant="contained"
            color="secondary"
            data-testid="cancelButton"
          >
            中止
          </Button>
        </DialogActions>
      </StyledDialog>
    </span>
  );
};

export default OperationDialog;
