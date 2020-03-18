import React from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import GenreTreeList from 'components/GenreTreeList';
import styled from 'styled-components';
import { RootState } from 'stores';
import { useSelector } from 'react-redux';
import GenreViewMenu from './GenreViewMenu';

interface GenreViewProps {
  onGenreSelect: (selectedId: string) => void;
  selectedGenreId: string;
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

const GenreView: React.FC<GenreViewProps> = ({
  onGenreSelect,
  selectedGenreId,
}) => {
  const { genres } = useSelector((state: RootState) => state.reactNotes);

  return (
    <View>
      <Toolbar />
      <Divider />
      <StyledGenreTreeList genres={genres} onGenreSelect={onGenreSelect} />
      <StyledGenreViewMenu selectedGenreId={selectedGenreId} />
    </View>
  );
};

export default GenreView;
