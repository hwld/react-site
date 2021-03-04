import React, { useState } from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';
import { SearchColumn } from './SearchColumn';
import { ResultNotesColumn } from './ResultNotesColumn';
import { Drawer } from '../../../ui/Drawer/Drawer';
import { SearchNotesCriteria } from '../../../../services/notes';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { useOpener } from '../../../../util/hooks/useOpener';
import { PageHeader } from '../common/PageHeader';
import { IconButton } from '../../../ui/IconButton';
import { AuthRequiredPage } from '../common/AuthRequiredPage';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  const { isMobile } = useAppStateContext();

  const history = useHistory();

  const {
    isOpen: isDrawerOpen,
    open: openDrawer,
    close: closeDrawer,
    toggle: toggleDrawer,
  } = useOpener(true);

  const [searchCriteria, setSearchCriteria] = useState<SearchNotesCriteria>({
    categoryId: '',
    title: '',
    text: '',
  });

  const backHomePage = () => {
    history.replace('/home');
  };

  return (
    <AuthRequiredPage className={className} aria-label="searchNotesPage">
      <PageHeader title="検索" onMenuClick={toggleDrawer}>
        <IconButton tooltipText="ホームに戻る" onClick={backHomePage}>
          <HomeIcon />
        </IconButton>
      </PageHeader>

      <Drawer
        width={isMobile ? '80' : '30'}
        isPresistent={!isMobile}
        open={isDrawerOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
      >
        <SearchColumn setCriteria={setSearchCriteria} />
      </Drawer>
      <ResultNotesColumn searchCriteria={searchCriteria} />
    </AuthRequiredPage>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};

  /* props => props... の ">" がstylelintに引っかかる */
  /* stylelint-disable-next-line selector-combinator-space-before */
  ${props => props.theme.breakpoints.down('xs')} {
    display: block;
  }
`;

export const SearchHome = StyledComponent;
