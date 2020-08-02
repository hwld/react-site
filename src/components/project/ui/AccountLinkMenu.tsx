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
import { TooltipIconButton } from '../../ui/TooltipIconButton';
import { GoogleLoginButton } from '../page/loginPage/GoogleLoginButton';
import { useAuthContext } from '../../../context/AuthContext';

type AccountLinkMenuProps = {};

const AccountLinkMenu: React.FC<AccountLinkMenuProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { linkWithGoogle } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
  };

  const link = async () => {
    try {
      closeMenu();
      await linkWithGoogle();
    } catch (error) {
      const { code }: firebase.auth.Error = error;
      switch (code) {
        case 'auth/credential-already-in-use':
          setErrorMessage('アカウントはすでに使用されています');
          openDialog();
          break;
        case 'auth/popup-closed-by-user':
          break;
        default:
          setErrorMessage('不明なエラー');
          openDialog();
          break;
      }
    }
  };

  return (
    <>
      <TooltipIconButton
        icon={<PersonAddIcon />}
        tooltipText="アカウントを紐付ける"
        onClick={openMenu}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MenuItem>
          <GoogleLoginButton onLogin={link} />
        </MenuItem>
      </Menu>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>アカウントの連携に失敗しました</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} variant="contained" color="secondary">
            <Typography color="textSecondary">閉じる</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { AccountLinkMenu };
