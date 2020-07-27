import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import SearchNoteIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';

const TopLayerHeader = styled(MuiAppBar)`
  width: 100%;
  z-index: ${props => props.theme.zIndex.drawer + 1};
`;

const AppTitle = styled(Typography)`
  font-weight: bold;
  color: ${props => props.theme.palette.text.secondary};
  flex-grow: 1;
`;

type MainHeaderProps = {
  onMenuClick: () => void;
  onGoSearchMode: () => void;
  onLogout: () => Promise<void>;
};

const MainHeader: React.FC<MainHeaderProps> = ({
  onMenuClick,
  onGoSearchMode,
  onLogout,
}) => {
  return (
    <TopLayerHeader position="absolute">
      <Toolbar>
        <IconButton edge="start" data-testid="menuButton" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <AppTitle variant="h5">Notes</AppTitle>
        <Tooltip title={<Typography>検索モードに移動</Typography>}>
          <IconButton data-testid="searchModeButton" onClick={onGoSearchMode}>
            <SearchNoteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<Typography>ログアウト</Typography>}>
          <IconButton data-testid="logoutButton" onClick={onLogout}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </TopLayerHeader>
  );
};

export default MainHeader;
