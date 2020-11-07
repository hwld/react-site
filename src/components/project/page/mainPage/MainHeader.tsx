import React from 'react';
import SearchNoteIcon from '@material-ui/icons/Search';
import { AppHeader } from '../../ui/AppHeader';
import { IconButton } from '../../../ui/IconButton';

type Props = {
  onMenuClick: () => void;

  onGoSearchMode: () => void;
};

const Component: React.FC<Props> = ({ onMenuClick, onGoSearchMode }) => {
  return (
    <AppHeader title="Notes" onMenuClick={onMenuClick}>
      <IconButton tooltipText="検索モードに移動" onClick={onGoSearchMode}>
        <SearchNoteIcon />
      </IconButton>
    </AppHeader>
  );
};

export const MainHeader = Component;
