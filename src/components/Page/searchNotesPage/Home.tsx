import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchNotesCriteria } from 'services/storage/notes';
import Drawer from 'components/util/Drawer/Drawer';
import Header from './Header';
import SearchCriteria from './SearchCriteria';
import ResultList from './ResultList';

const Background = styled.div`
  display: 'flex';
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const LeftDrawer = styled(Drawer)``;

const RightResultList = styled(ResultList)`
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
      <LeftDrawer
        width="30"
        mobileWidth="80"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <SearchCriteria setCriteria={setCriterial} />
      </LeftDrawer>
      <RightResultList searchCriteria={searchCriteria} />
    </Background>
  );
};

export default SearchNotesHome;
