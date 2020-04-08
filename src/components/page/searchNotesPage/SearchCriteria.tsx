import React from 'react';
import { useTheme } from '@material-ui/core';
import { SearchNotesCriteria } from 'services/notes';
import ContentColumn from '../../ContentColumn';
import CriteriaFields from './CriteriaFields';

interface SearchNotesCriteriaProps {
  setCriteria: (criteria: SearchNotesCriteria) => void;
  className?: string;
}

const SearchCriteria: React.FC<SearchNotesCriteriaProps> = ({
  setCriteria,
  className,
}) => {
  const theme = useTheme();

  const search = (criteria: SearchNotesCriteria) => {
    setCriteria(criteria);
  };

  return (
    <ContentColumn
      className={className}
      content={<CriteriaFields search={search} />}
      footerMenu={<></>}
      footerColor={theme.palette.secondary.light}
    />
  );
};

export default SearchCriteria;
