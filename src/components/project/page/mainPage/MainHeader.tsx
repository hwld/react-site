import React from 'react';
import SearchNoteIcon from '@material-ui/icons/Search';
import { AppHeader } from '../../ui/AppHeader';
import { TooltipIconButton } from '../../../ui/TooltipIconButton';

type MainHeaderProps = {
  onMenuClick: () => void;
  onGoSearchMode: () => void;
  onLogout: () => Promise<void>;
  isAnonymous: boolean;
};

const MainHeader: React.FC<MainHeaderProps> = ({
  onMenuClick,
  onGoSearchMode,
  onLogout,
  isAnonymous,
}) => {
  return (
    <AppHeader
      title="Notes"
      onMenuClick={onMenuClick}
      onLogout={onLogout}
      menuItems={
        <TooltipIconButton
          tooltipText="検索モードに移動"
          icon={<SearchNoteIcon />}
          onClick={onGoSearchMode}
        />
      }
      isAnonymous={isAnonymous}
    />
  );
};

export { MainHeader };
