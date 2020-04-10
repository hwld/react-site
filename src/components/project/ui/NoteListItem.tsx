import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import ListItem from '../../ui/ListItem';
import { Note, SearchNotesCriteria } from '../../../services/notes';
import RemoveNoteDialog from '../operation/RemoveNoteDialog';
import UpdateNoteDialog from '../operation/UpdateNoteDialog';

interface NoteListItemProps {
  note: Note;
  searchCriteria?: SearchNotesCriteria;
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

const HighlightSpan = styled.span`
  background-color: ${props => props.theme.palette.secondary.light};
  color: ${props => props.theme.palette.primary.main};
`;

const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  searchCriteria,
}) => {
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`));

    return (
      <span>
        {parts.map((part, i) =>
          part === highlight ? (
            // eslint-disable-next-line react/no-array-index-key
            <HighlightSpan key={i}>{part}</HighlightSpan>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  const title = () => {
    if (!searchCriteria) return note.title;

    return getHighlightedText(note.title, searchCriteria.title);
  };

  const text = () => {
    if (!searchCriteria) return note.text;

    return getHighlightedText(note.text, searchCriteria.text);
  };

  const authorName = () => {
    if (!searchCriteria) return note.authorName;

    return getHighlightedText(note.authorName, searchCriteria.authorName);
  };

  const bookName = () => {
    if (!searchCriteria) return note.bookName;

    return getHighlightedText(note.bookName, searchCriteria.bookName);
  };

  return (
    <ListItem itemId={note.id}>
      <GridContainer>
        <NoteTextContainer>
          <TitleText variant="h4">
            <span>{title()}</span>
          </TitleText>
          <NoteText>{text()}</NoteText>
          <MetaData>
            <MetaText>著者名:{authorName()}</MetaText>
            <MetaText>書籍名:{bookName()}</MetaText>
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
