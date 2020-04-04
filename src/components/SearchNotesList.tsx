import React from 'react';
import { Typography } from '@material-ui/core';
import ContentView from './ContentView';

interface SearchNotesListProps {
  hoge?: string;
}

const SearchNotesList: React.FC<{}> = () => {
  return (
    <ContentView
      pageType="search"
      content={<Typography>List</Typography>}
      footerMenu={<></>}
    />
  );
};
export default SearchNotesList;
