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

interface OperationDialogProps {
  activatorDisabled?: boolean;
  activatorIcon: JSX.Element;
  doneText?: string;
  onDone?: () => void;
  doneDisabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  tooltipText: string;
}

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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  const closeDialog = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // ToolTipの子コンポーネントにdisable属性をつけるとエラーが出るのでifで分岐させる
  const activator = () => {
    if (activatorDisabled)
      return <StyledIconButton disabled>{activatorIcon}</StyledIconButton>;

    return (
      <Tooltip title={<Typography>{tooltipText}</Typography>}>
        <StyledIconButton
          onClick={event => {
            event.stopPropagation();
            openDialog();
          }}
        >
          {activatorIcon}
        </StyledIconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {activator()}
      <StyledDialog
        fullWidth
        open={isOpen}
        onClose={closeDialog}
        maxWidth="sm"
        // ダイアログ外をクリックするとクリックイベントが伝搬してしまうため、ここで防ぐ
        onClick={event => event.stopPropagation()}
      >
        {children}
        <DialogActions>
          <Button
            disabled={doneDisabled}
            onClick={event => {
              event.stopPropagation();
              if (onDone) onDone();
              closeDialog();
            }}
            variant="contained"
            color="secondary"
          >
            {doneText || '完了'}
          </Button>
          <Button
            onClick={event => {
              event.stopPropagation();
              closeDialog();
            }}
            variant="contained"
            color="secondary"
          >
            中止
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default OperationDialog;