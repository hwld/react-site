import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchNotesCriteria } from 'services/storage/notes';
import Header from './Header';
import SearchCriteria from './SearchCriteria';
import ResultList from './ResultList';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const LeftDrawer = styled.div<{ isOpen: boolean }>`
  background-color: ${props => props.theme.palette.primary.main};
  flex-basis: 30vw;
  margin-left: ${props => (props.isOpen ? '0px' : '-30vw')};
  transition-duration: 0.3s;
  overflow: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

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
      <LeftDrawer isOpen={isOpen}>
        <SearchCriteria setCriteria={setCriterial} />
      </LeftDrawer>
      <RightResultList searchCriteria={searchCriteria} />
    </Background>
  );
};

export default SearchNotesHome;
