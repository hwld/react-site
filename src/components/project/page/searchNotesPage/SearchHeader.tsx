import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import { AppHeader } from '../../ui/AppHeader';
import { TooltipIconButton } from '../../../ui/TooltipIconButton';

type HeaderProps = {
  onMenuClick: () => void;
  onLogout: () => Promise<void>;
  isAnonymous: boolean;
};

const SearchHeader: React.FC<HeaderProps> = ({
  onMenuClick,
  onLogout,
  isAnonymous,
}) => {
  const history = useHistory();

  const backHome = () => {
    history.replace('/home');
  };

  return (
    <AppHeader
      title="検索"
      onMenuClick={onMenuClick}
      onLogout={onLogout}
      menuItems={
        <TooltipIconButton
          tooltipText="ホームに戻る"
          icon={<HomeIcon />}
          onClick={backHome}
        />
      }
      isAnonymous={isAnonymous}
    />
  );
};

export { SearchHeader };
