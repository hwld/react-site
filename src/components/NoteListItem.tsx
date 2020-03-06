import React from 'react';
import { ListItem, Typography, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import styled from 'styled-components';
import { Note } from 'stores/store';

interface NoteListItemProps {
  note: Note;
  selected: boolean;
  onSelectNote: () => void;
  onDeleteNote: () => void;
  onEditNote: () => void;
}

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: end;
`;

const NoteTextContainer = styled.div`
  padding-left: 20px;
`;

const TitleText = styled(Typography)`
  font-size: 2em;
`;

const NoteText = styled(Typography)`
  white-space: pre-line;
  width: 100%;
  font-size: 1.2em;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const MetaData = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 1em;
`;

const MetaText = styled(Typography)`
  font-size: 1em;
  color: #c0c0c0;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: 10px;
  background-color: ${props => props.theme.palette.secondary.main};

  &:hover {
    background-color: ${props => props.theme.palette.secondary.dark};
  }
`;

const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  selected,
  onSelectNote,
  onDeleteNote,
  onEditNote,
}) => {
  return (
    <ListItem button selected={selected} onClick={onSelectNote}>
      <GridContainer>
        <NoteTextContainer>
          <TitleText variant="h4">{note.title}</TitleText>
          <NoteText>{note.text}</NoteText>
          <MetaData>
            <MetaText>著者名:{note.authorName}</MetaText>
            <MetaText>書籍名:{note.bookName}</MetaText>
          </MetaData>
        </NoteTextContainer>
        <div>
          <StyledIconButton
            onClick={event => {
              event.stopPropagation();
              onDeleteNote();
            }}
            size="medium"
          >
            <DeleteIcon />
          </StyledIconButton>
          <StyledIconButton
            onClick={event => {
              event.stopPropagation();
              onEditNote();
            }}
            size="medium"
          >
            <EditIcon />
          </StyledIconButton>
        </div>
      </GridContainer>
    </ListItem>
  );
};

export default NoteListItem;
