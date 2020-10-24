import React from 'react';
import { SearchNotesCriteria } from '../../../../services/notes';
import { ContentColumn } from '../../ui/ContentColumn';
import { SearchForm } from './SearchForm';

type Props = {
  setCriteria: (criteria: SearchNotesCriteria) => void;
  className?: string;
};

const Component: React.FC<Props> = ({ setCriteria, className }) => {
  return (
    <ContentColumn className={className}>
      <SearchForm search={setCriteria} />
    </ContentColumn>
  );
};

export const SearchColumn = Component;
