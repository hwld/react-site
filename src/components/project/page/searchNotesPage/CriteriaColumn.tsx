import React from 'react';
import { SearchNotesCriteria } from '../../../../services/notes';
import ContentColumn from '../../ui/ContentColumn';
import CriteriaFields from './CriteriaFields';

interface SearchNotesCriteriaProps {
  setCriteria: (criteria: SearchNotesCriteria) => void;
  className?: string;
}

const SearchCriteria: React.FC<SearchNotesCriteriaProps> = ({
  setCriteria,
  className,
}) => {
  const search = (criteria: SearchNotesCriteria) => {
    setCriteria(criteria);
  };

  return (
    <ContentColumn className={className}>
      <CriteriaFields search={search} />
    </ContentColumn>
  );
};

export default SearchCriteria;
