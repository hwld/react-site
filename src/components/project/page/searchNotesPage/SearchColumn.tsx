import React from 'react';
import { ContentColumn } from '../../ui/ContentColumn';
import { SearchForm } from './SearchForm';
import { SearchNotesCriteria } from '../../../../types/note';

type SearchColumnProps = {
  setCriteria: (criteria: SearchNotesCriteria) => void;
  className?: string;
};

const SearchColumn: React.FC<SearchColumnProps> = ({
  setCriteria,
  className,
}) => {
  return (
    <ContentColumn className={className}>
      <SearchForm search={setCriteria} />
    </ContentColumn>
  );
};

export { SearchColumn };
