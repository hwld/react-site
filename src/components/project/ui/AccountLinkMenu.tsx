import React, { useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  DialogContentText,
  Typography,
} from '@material-ui/core';
import { IconButton } from '../../ui/IconButton';
import { useAuthContext } from '../../../context/AuthContext';
import { LoginButton } from './LoginButton';
import { useOpener } from '../../../util/hooks/useOpener';

const Component: React.FC<{}> = () => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const { linkWithGoogle } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState('');
  const {
    isOpen: isOpenErrorDialog,
    open: openErrorDialog,
    close: closeErrorDialog,
  } = useOpener(false);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorElement(null);
  };

  const openErrorDialogWithMessage = (message: string) => {
    setErrorMessage(message);
    openErrorDialog();
  };

  const link = async () => {
    try {
      closeMenu();
      await linkWithGoogle();
    } catch (error) {
      switch (error.code) {
        case 'auth/credential-already-in-use':
          openErrorDialogWithMessage('アカウントはすでに使用されています');
          break;
        case 'auth/popup-closed-by-user':
          break;
        default:
          openErrorDialogWithMessage('不明なエラー');
          break;
      }
    }
  };

  return (
    <>
      <IconButton tooltipText="アカウントを紐付ける" onClick={openMenu}>
        <PersonAddIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem>
          <LoginButton
            imgSrc="./google.svg"
            imgAlt="google"
            onClick={link}
            message="Googleでログイン"
            data-testid="googleLoginButton"
          />
        </MenuItem>
      </Menu>

      <Dialog open={isOpenErrorDialog} onClose={closeErrorDialog}>
        <DialogTitle>アカウントの連携に失敗しました</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeErrorDialog}
            variant="contained"
            color="secondary"
          >
            <Typography color="textSecondary">閉じる</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const AccountLinkMenu = Component;
