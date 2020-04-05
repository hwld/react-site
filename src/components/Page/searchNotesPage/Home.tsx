import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import SearchCriteria from './SearchCriteria';
import ResultList from './ResultList';

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const Drawer = styled.div<{ width: string; isOpen: boolean }>`
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  flex-basis: ${props => `${props.width}px`};
  margin-left: ${props => (props.isOpen ? '0px' : `-${props.width}px`)};
  transition-duration: 0.3s;
  overflow: auto;
`;

const LeftSearchCriteria = styled(SearchCriteria)`
  flex: 1;
`;

const RightSearchNotesList = styled(ResultList)`
  flex: 1;
`;

const SearchNotesHome: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Background>
      <Header onMenuClick={() => setIsOpen(state => !state)} />
      <Drawer width="500" isOpen={isOpen}>
        <LeftSearchCriteria />
      </Drawer>
      <RightSearchNotesList />
    </Background>
  );
};

export default SearchNotesHome;
