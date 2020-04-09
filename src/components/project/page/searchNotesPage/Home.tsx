import React, { useState } from 'react';
import styled from 'styled-components';

import Header from './Header';
import CriteriaColumn from './CriteriaColumn';
import ResultNotesColumn from './ResultNotesColumn';
import { SearchNotesCriteria } from '../../../../services/notes';
import Drawer from '../../../ui/Drawer';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const RightResultNotesColumn = styled(ResultNotesColumn)`
  flex: 1;
`;

const SearchNotesHome: React.FC<{}> = () => {
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

  return (
    <Background>
      <Header onMenuClick={() => setIsOpen(state => !state)} />
      <Drawer
        width="30"
        mobileWidth="80"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <CriteriaColumn setCriteria={setCriterial} />
      </Drawer>
      <RightResultNotesColumn searchCriteria={searchCriteria} />
    </Background>
  );
};

export default SearchNotesHome;
