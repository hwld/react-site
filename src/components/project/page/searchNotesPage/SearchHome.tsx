import React, { useState } from 'react';
import styled from 'styled-components';
import { useTheme, useMediaQuery } from '@material-ui/core';
import { SearchHeader } from './SearchHeader';
import { SearchColumn } from './SearchColumn';
import { ResultNotesColumn } from './ResultNotesColumn';
import {
  SearchNotesCriteria,
  createDefaultSearchNotesCriteria,
} from '../../../../repositories/notes';
import { Drawer } from '../../../ui/Drawer/Drawer';
import { MobileContextProvider } from '../../../../context/MobileContext';

const Background = styled.div`
  display: flex;

  /* props => props... の ">" がstylelintに引っかかる */
  /* stylelint-disable-next-line selector-combinator-space-before */
  ${props => props.theme.breakpoints.down('xs')} {
    display: block;
  }
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const SearchHome: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState<SearchNotesCriteria>(
    createDefaultSearchNotesCriteria(),
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
    <MobileContextProvider value={{ isMobile }}>
      <Background data-testid="searchNotestPage">
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
      </Background>
    </MobileContextProvider>
  );
};

export { SearchHome };
