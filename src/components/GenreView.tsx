import React from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import GenreTreeList, { Genre } from 'components/GenreTreeList';

const genres: Genre[] = [
  { genreName: 'genre1', id: '1', parentGenreId: null, childrenGenreIds: [] },
  {
    genreName: 'genre2',
    id: '2',
    parentGenreId: null,
    childrenGenreIds: ['3', '5'],
  },
  {
    genreName: 'genre2-1',
    id: '3',
    parentGenreId: '2',
    childrenGenreIds: ['4'],
  },
  {
    genreName: 'genre2-2',
    id: '5',
    parentGenreId: '2',
    childrenGenreIds: [],
  },
  {
    genreName: 'genre2-1-1',
    id: '4',
    parentGenreId: '3',
    childrenGenreIds: [],
  },
];

interface GenreViewProps {
  onGenreSelect: (event: React.ChangeEvent<{}>, selectedId: string) => void;
}

const GenreView: React.FC<GenreViewProps> = ({ onGenreSelect }) => {
  return (
    <>
      <Toolbar />
      <Divider />
      <GenreTreeList genres={genres} onGenreSelect={onGenreSelect} />
    </>
  );
};

export default GenreView;
