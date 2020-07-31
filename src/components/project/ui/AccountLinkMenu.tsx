import React, { useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Menu, MenuItem } from '@material-ui/core';
import { TooltipIconButton } from '../../ui/TooltipIconButton';
import { GoogleLoginButton } from '../page/loginPage/GoogleLoginButton';
import { useAuthContext } from '../../../context/AuthContext';

type AccountLinkMenuProps = {};

const AccountLinkMenu: React.FC<AccountLinkMenuProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { linkWithGoogle } = useAuthContext();

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {' '}
      <TooltipIconButton
        icon={<PersonAddIcon />}
        tooltipText="アカウントを紐付ける"
        onClick={openMenu}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem>
          <GoogleLoginButton onLogin={linkWithGoogle} />
        </MenuItem>
      </Menu>
    </>
  );
};

export { AccountLinkMenu };
