import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const TopLayerHeader = styled(MuiAppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const AppTitle = styled(Typography)`
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

type HeaderProps = {
  onMenuClick: () => void;
  onLogout: () => Promise<void>;
};

const SearchHeader: React.FC<HeaderProps> = ({ onMenuClick, onLogout }) => {
  const history = useHistory();

  const backHome = () => {
    history.replace('/home');
  };

  return (
    <TopLayerHeader position="absolute">
      <Toolbar>
        <IconButton edge="start" onClick={onMenuClick} data-testid="menuButton">
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h5">検索</AppTitle>
        <Tooltip title={<Typography>ホームに戻る</Typography>}>
          <IconButton onClick={backHome}>
            <HomeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<Typography>ログアウト</Typography>}>
          <IconButton onClick={onLogout} data-testid="logoutButton">
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </TopLayerHeader>
  );
};

export default SearchHeader;
