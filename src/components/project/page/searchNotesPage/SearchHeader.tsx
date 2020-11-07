import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import { AppHeader } from '../../ui/AppHeader';
import { IconButton } from '../../../ui/IconButton';

type Props = {
  onMenuClick: () => void;
};

const Component: React.FC<Props> = ({ onMenuClick }) => {
  const history = useHistory();

  const backHome = () => {
    history.replace('/home');
  };

  return (
    <AppHeader title="検索" onMenuClick={onMenuClick}>
      <IconButton tooltipText="ホームに戻る" onClick={backHome}>
        <HomeIcon />
      </IconButton>
    </AppHeader>
  );
};

export const SearchHeader = Component;
