import React from 'react';
import { SearchNotesCriteria } from '../../../../services/notes';
import ContentColumn from '../../ui/ContentColumn';
import SearchForm from './SearchForm';

interface SearchColumnProps {
  setCriteria: (criteria: SearchNotesCriteria) => void;
  className?: string;
}

const SearchColumn: React.FC<SearchColumnProps> = ({
  setCriteria,
  className,
}) => {
  const search = (criteria: SearchNotesCriteria) => {
    setCriteria(criteria);
  };

  return (
    <ContentColumn className={className}>
      <SearchForm search={search} />
    </ContentColumn>
  );
};

export default SearchColumn;
