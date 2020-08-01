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
} from '@material-ui/core';
import { TooltipIconButton } from '../../ui/TooltipIconButton';
import { useAuthContext } from '../../../context/AuthContext';

type AccountSettingMenuProps = {};
const AccountSettingMenu: React.FC<AccountSettingMenuProps> = () => {
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
      <TooltipIconButton
        icon={<AccountCircleIcon />}
        tooltipText="アカウント設定"
        onClick={openMenu}
      />
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
            アカウントを削除すると全てのデータが消えます.
          </DialogContent>
          <DialogContent>
            再度ログインを行ってアカウントを削除してください.
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="secondary"
              onClick={clickDeleteButton}
            >
              削除
            </Button>
            <Button variant="contained" color="secondary" onClick={closeDialog}>
              中止
            </Button>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
};

export { AccountSettingMenu };
