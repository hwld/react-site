import React from 'react';
import SearchNoteIcon from '@material-ui/icons/Search';
import { AppHeader } from '../../ui/AppHeader';
import { TooltipIconButton } from '../../../ui/TooltipIconButton';

type MainHeaderProps = {
  onMenuClick: () => void;
  onGoSearchMode: () => void;
};

const MainHeader: React.FC<MainHeaderProps> = ({
  onMenuClick,
  onGoSearchMode,
}) => {
  return (
    <AppHeader
      title="Notes"
      onMenuClick={onMenuClick}
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

export { MainHeader };
