import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchHeader } from './SearchHeader';
import { SearchColumn } from './SearchColumn';
import { ResultNotesColumn } from './ResultNotesColumn';
import { Drawer } from '../../../ui/Drawer/Drawer';
import { SearchNotesCriteria } from '../../../../services/notes';
import { useAppStateContext } from '../../../../context/AppStateContext';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState<SearchNotesCriteria>({
    categoryId: '',
    title: '',
    text: '',
  });
  const { isMobile } = useAppStateContext();

  const invertDrawer = () => {
    setIsOpen(state => !state);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <div className={className} data-testid="searchNotestPage">
      <SearchHeader onMenuClick={invertDrawer} />
      <Drawer
        width={isMobile ? '80' : '30'}
        isPresistent={!isMobile}
        open={isOpen}
        onOpen={openDrawer}
        onClose={closeDrawer}
      >
        <SearchColumn setCriteria={setSearchCriteria} />
      </Drawer>
      <ResultNotesColumn searchCriteria={searchCriteria} />
    </div>
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
