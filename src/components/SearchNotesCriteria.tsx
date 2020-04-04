import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import ContentView from './ContentView';

interface SearchNotesCriteriaProps {
  hoge?: string;
  className?: string;
}

const SearchNotesCriteria: React.FC<SearchNotesCriteriaProps> = ({
  className,
}) => {
  const theme = useTheme();

  return (
    <ContentView
      className={className}
      content={<Typography>criteria</Typography>}
      footerMenu={<></>}
      footerColor={theme.palette.secondary.light}
    />
  );
};

export default SearchNotesCriteria;
