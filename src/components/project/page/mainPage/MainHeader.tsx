import React from 'react';
import SearchNoteIcon from '@material-ui/icons/Search';
import { AppHeader } from '../../ui/AppHeader';
import { IconButton } from '../../../ui/IconButton';

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
        <IconButton tooltipText="検索モードに移動" onClick={onGoSearchMode}>
          <SearchNoteIcon />
        </IconButton>
      }
    />
  );
};

export { MainHeader };
