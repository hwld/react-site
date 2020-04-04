import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import ContentView from './ContentView';

interface SearchNotesCriteriaProps {
  hoge?: string;
}

const SearchNotesCriteria: React.FC<SearchNotesCriteriaProps> = () => {
  const theme = useTheme();

  return (
    <ContentView
      content={<Typography>criteria</Typography>}
      footerMenu={<></>}
      footerColor={theme.palette.secondary.light}
    />
  );
};

export default SearchNotesCriteria;
