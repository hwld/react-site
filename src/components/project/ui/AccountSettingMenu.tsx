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

const Component: React.FC<{}> = () => {
  const { googleLogin, deleteAccount } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    closeMenu();
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
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem onClick={openDialog}>アカウントを削除する</MenuItem>
        <Dialog open={open} onClose={closeDialog}>
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
            <Button variant="contained" color="secondary" onClick={closeDialog}>
              <Typography color="textSecondary">中止</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
};

export const AccountSettingMenu = Component;
