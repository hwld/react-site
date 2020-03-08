import React from 'react';
import { Toolbar, Divider } from '@material-ui/core';
import NoteList from 'components/NoteList';
import styled from 'styled-components';
import NoteViewMenu from 'components/NoteViewMenu';

interface NoteViewProps {
  selectedGenreId: string;
  className?: string;
}

const View = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledNoteList = styled(NoteList)`
  height: 85%;
`;

const StyledNoteViewMenu = styled(NoteViewMenu)`
  background-color: ${props => props.theme.palette.secondary.main};
  flex: 1;
`;

const NoteView: React.FC<NoteViewProps> = ({ selectedGenreId, className }) => {
  return (
    <View className={className}>
      <Toolbar />
      <Divider />
      <StyledNoteList selectedGenreId={selectedGenreId} />
      <StyledNoteViewMenu />
    </View>
  );
};

export default NoteView;
