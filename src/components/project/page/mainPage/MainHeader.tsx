import React from 'react';
import SearchNoteIcon from '@material-ui/icons/Search';
import { AppHeader } from '../../ui/AppHeader';
import { TooltipIconButton } from '../../../ui/TooltipIconButton';

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
    <AppHeader
      onMenuClick={onMenuClick}
      onLogout={onLogout}
      menuItems={
        <TooltipIconButton
          tooltipText="検索モードに移動"
          icon={<SearchNoteIcon />}
          onClick={onGoSearchMode}
        />
      }
    />
  );
};

export default MainHeader;
