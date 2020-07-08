import React, { useState } from 'react';
import styled from 'styled-components';

import { useTheme, useMediaQuery } from '@material-ui/core';
import SearchHeader from './SearchHeader';
import SearchColumn from './SearchColumn';
import ResultNotesColumn from './ResultNotesColumn';
import { SearchNotesCriteria } from '../../../../services/notes';
import Drawer from '../../../ui/Drawer/Drawer';
import MobileContext from '../../../../context/MobileContext';

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

const RightResultNotesColumn = styled(ResultNotesColumn)`
  flex: 1;
`;

const SearchHome: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState<SearchNotesCriteria>({
    genreId: '',
    title: '',
    text: '',
    authorName: '',
    bookName: '',
  });
  const setCriterial = (criteria: SearchNotesCriteria) => {
    setSearchCriteria(criteria);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <MobileContext.Provider value={{ isMobile }}>
      <Background data-testid="searchNotestPage">
        <SearchHeader onMenuClick={() => setIsOpen(state => !state)} />
        <Drawer
          width={isMobile ? '80' : '30'}
          isPresistent={!isMobile}
          open={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        >
          <SearchColumn setCriteria={setCriterial} />
        </Drawer>
        <RightResultNotesColumn searchCriteria={searchCriteria} />
      </Background>
    </MobileContext.Provider>
  );
};

export default SearchHome;
