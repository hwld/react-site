import React from 'react';
import { Typography } from '@material-ui/core';
import ContentView from './ContentView';

interface SearchNotesCriteriaProps {
  hoge?: string;
}

const SearchNotesCriteria: React.FC<SearchNotesCriteriaProps> = () => {
  return (
    <ContentView
      pageType="search"
      content={<Typography>criteria</Typography>}
      footerMenu={<></>}
    />
  );
};

export default SearchNotesCriteria;
