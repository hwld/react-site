import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import ContentView from './ContentView';

interface SearchNotesListProps {
  hoge?: string;
}

const SearchNotesList: React.FC<SearchNotesListProps> = () => {
  const theme = useTheme();

  return (
    <ContentView
      content={<Typography>List</Typography>}
      footerMenu={<></>}
      footerColor={theme.palette.secondary.light}
    />
  );
};
export default SearchNotesList;
