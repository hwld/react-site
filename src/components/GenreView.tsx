import React from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import GenreTreeList from 'components/GenreTreeList';
import styled from 'styled-components';
import { Genre } from 'stores/store';
import GenreViewMenu from './GenreViewMenu';

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
  className?: string;
}

const View = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledGenreTreeList = styled(GenreTreeList)`
  height: 85%;
`;

const StyledGenreViewMenu = styled(GenreViewMenu)`
  background-color: ${props => props.theme.palette.secondary.main};
  flex-grow: 1;
`;

const GenreView: React.FC<GenreViewProps> = ({ onGenreSelect }) => {
  return (
    <View>
      <Toolbar />
      <Divider />
      <StyledGenreTreeList genres={genres} onGenreSelect={onGenreSelect} />
      <StyledGenreViewMenu />
    </View>
  );
};

export default GenreView;
