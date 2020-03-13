import React from 'react';
import { ListItem, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Note } from 'stores/store';
import RemoveNoteDialog from './RemoveNoteDialog';
import UpdateNoteDialog from './UpdateNoteDialog';

interface NoteListItemProps {
  note: Note;
  selected: boolean;
  onSelectNote: () => void;
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

const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  selected,
  onSelectNote,
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
          <RemoveNoteDialog selectedNoteIds={[note.id]} />
          <UpdateNoteDialog defaultNote={note} />
        </div>
      </GridContainer>
    </ListItem>
  );
};

export default NoteListItem;
