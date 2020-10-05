import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import { AppHeader } from '../../ui/AppHeader';
import { IconButton } from '../../../ui/IconButton';

type HeaderProps = {
  onMenuClick: () => void;
};

const SearchHeader: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const history = useHistory();

  const backHome = () => {
    history.replace('/home');
  };

  return (
    <AppHeader
      title="検索"
      onMenuClick={onMenuClick}
      menuItems={
        <IconButton
          tooltipText="ホームに戻る"
          icon={<HomeIcon />}
          onClick={backHome}
        />
      }
    />
  );
};

export { SearchHeader };
