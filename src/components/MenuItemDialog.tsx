import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, IconButton } from '@material-ui/core';

const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    background: ${props => props.theme.palette.primary.main};
  }
`;

interface MenuItemDialogProps {
  activaterIcon: JSX.Element;
}

const MenuItemDialog: React.FC<MenuItemDialogProps> = ({
  children,
  activaterIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const OpenDialog = () => {
    setIsOpen(true);
  };

  const CloseDialog = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton onClick={OpenDialog}>{activaterIcon}</IconButton>
      <StyledDialog open={isOpen} onClose={CloseDialog}>
        {children}
      </StyledDialog>
    </>
  );
};

export default MenuItemDialog;
