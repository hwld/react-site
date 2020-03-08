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
  disabled?: boolean;
  activaterIcon: JSX.Element;
  onComplete?: () => void;
  onClose?: () => void;
  actionText?: string;
  tooltipText: string;
}

const MenuItemDialog: React.FC<MenuItemDialogProps> = ({
  children,
  activaterIcon,
  actionText,
  onComplete,
  onClose,
  disabled,
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

  return (
    <>
      <Tooltip title={tooltipText}>
        <IconButton onClick={OpenDialog} disabled={disabled}>
          {activaterIcon}
        </IconButton>
      </Tooltip>
      <StyledDialog fullWidth open={isOpen} onClose={CloseDialog} maxWidth="sm">
        {children}
        <DialogActions>
          <Button
            onClick={() => {
              if (onComplete) onComplete();
              CloseDialog();
            }}
          >
            {actionText || '完了'}
          </Button>
          <Button onClick={CloseDialog}>中止</Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default MenuItemDialog;
