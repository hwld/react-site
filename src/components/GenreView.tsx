import React from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import GenreTreeList from 'components/GenreTreeList';
import styled from 'styled-components';
import GenreViewMenu from './GenreViewMenu';

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
      <StyledGenreTreeList onGenreSelect={onGenreSelect} />
      <StyledGenreViewMenu />
    </View>
  );
};

export default GenreView;
