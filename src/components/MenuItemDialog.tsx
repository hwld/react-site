import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Dialog,
  IconButton,
  DialogActions,
  Button,
  Tooltip,
} from '@material-ui/core';

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background: ${props => props.theme.palette.primary.main};
  }
`;

interface MenuItemDialogProps {
  activatorDisabled?: boolean;
  activatorIcon: JSX.Element;
  doneText?: string;
  onDone?: () => void;
  doneDisabled?: boolean;
  onClose?: () => void;
  tooltipText: string;
}

const MenuItemDialog: React.FC<MenuItemDialogProps> = ({
  children,
  activatorIcon,
  activatorDisabled,
  doneText,
  onDone,
  doneDisabled,
  onClose,
  tooltipText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const OpenDialog = () => {
    setIsOpen(true);
  };

  const CloseDialog = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // ToolTipの子コンポーネントにdisable属性をつけるとエラーが出るのでifで分岐させる
  const activator = () => {
    if (activatorDisabled)
      return (
        <IconButton onClick={OpenDialog} disabled>
          {activatorIcon}
        </IconButton>
      );

    return (
      <Tooltip title={tooltipText}>
        <IconButton onClick={OpenDialog}>{activatorIcon}</IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {activator()}
      <StyledDialog fullWidth open={isOpen} onClose={CloseDialog} maxWidth="sm">
        {children}
        <DialogActions>
          <Button
            disabled={doneDisabled}
            onClick={() => {
              if (onDone) onDone();
              CloseDialog();
            }}
            variant="contained"
            color="secondary"
          >
            {doneText || '完了'}
          </Button>
          <Button onClick={CloseDialog} variant="contained" color="secondary">
            中止
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default MenuItemDialog;
