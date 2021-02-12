import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  Typography,
} from '@material-ui/core';
import { IconButton } from '../../ui/IconButton';
import { useAuthContext } from '../../../context/AuthContext';
import { useOpener } from '../../../util/hooks/useOpener';
import { firebase } from '../../../firebaseConfig';

const Component: React.FC<{}> = () => {
  const { googleLogin, deleteAccount } = useAuthContext();

  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const {
    isOpen: isOpenDeleteDialog,
    open: openDeleteDialog,
    close: closeDeleteDialog,
  } = useOpener(false);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorElement(null);
  };

  const clickDeleteButton = async () => {
    try {
      await googleLogin();
      deleteAccount();
    } catch (error) {
      const { code }: firebase.auth.Error = error;
      switch (code) {
        case 'auth/requires-recent-login':
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <IconButton tooltipText="アカウント設定" onClick={openMenu}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem onClick={openDeleteDialog}>アカウントを削除する</MenuItem>
      </Menu>

      <Dialog open={isOpenDeleteDialog} onClose={closeDeleteDialog}>
        <DialogTitle>アカウントの削除</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
            アカウントを削除すると全てのデータが消えます.
          </DialogContentText>
          <DialogContentText color="textPrimary">
            再度ログインを行ってアカウントを削除してください.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={clickDeleteButton}
          >
            <Typography color="textSecondary">削除</Typography>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={closeDeleteDialog}
          >
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const AccountSettingMenu = Component;
