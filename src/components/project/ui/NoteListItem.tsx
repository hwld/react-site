import React, { useMemo, useCallback, useRef, createRef } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ListItem } from '../../ui/List/ListItem';
import { RemoveNoteDialog } from '../operation/RemoveNoteDialog';
import { UpdateNoteDialog } from '../operation/UpdateNoteDialog';
import { Note, SearchNotesCriteria } from '../../../services/notes';

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 85% 15%;
  align-items: flex-start;
`;

const NoteTextContainer = styled.div`
  padding-left: 20px;
  word-break: break-all;
`;

const TitleText = styled(Typography)`
  font-size: 2em;
  font-weight: bold;
`;

const NoteText = styled(Typography)`
  white-space: pre-line;
  font-size: 1.2em;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const MetaData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

const MetaText = styled(Typography)`
  font-size: 1em;
  color: #c0c0c0;
  margin-right: 10px;
`;

const HighlightSpan = styled.span`
  background-color: ${props => props.theme.palette.secondary.light};
  color: ${props => props.theme.palette.primary.main};
`;

const MenuContainer = styled.div`
  line-height: 60px;
`;

const MenuItem = styled.span`
  margin-left: 10px;
`;

type NoteListItemProps = {
  note: Note;
  itemId: string;
  searchCriteria?: SearchNotesCriteria;
};
const NoteListItem: React.FC<NoteListItemProps> = ({
  note,
  itemId,
  searchCriteria,
}) => {
  const refs = useRef<
    [
      React.RefObject<HTMLDivElement>,
      React.RefObject<HTMLButtonElement>,
      React.RefObject<HTMLButtonElement>,
    ]
  >([createRef(), createRef(), createRef()]);

  //
  const focusIndex = useRef<number>(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight': {
        if (focusIndex.current + 1 < refs.current.length) {
          const nextRef = refs.current[focusIndex.current + 1].current;
          if (nextRef) {
            nextRef.focus();
            focusIndex.current += 1;
          }
        }
        break;
      }
      case 'ArrowLeft': {
        if (focusIndex.current > 0) {
          const prevRef = refs.current[focusIndex.current - 1].current;
          if (prevRef) {
            prevRef.focus();
            focusIndex.current -= 1;
          }
          event.stopPropagation();
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowDown': {
        focusIndex.current = 0;
        break;
      }
      default:
        break;
    }
  };

  const getHighlightedText = useCallback((text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`));

    return (
      <span>
        {parts.map((part, i) =>
          part === highlight ? (
            // eslint-disable-next-line react/no-array-index-key
            <HighlightSpan key={i} data-testid="search-highlight">
              {part}
            </HighlightSpan>
          ) : (
            part
          ),
        )}
      </span>
    );
  }, []);

  const title = useMemo(() => {
    if (!searchCriteria || searchCriteria.title === '') return note.title;

    return getHighlightedText(note.title, searchCriteria.title);
  }, [getHighlightedText, note.title, searchCriteria]);

  const text = useMemo(() => {
    if (!searchCriteria || searchCriteria.text === '') return note.text;

    return getHighlightedText(note.text, searchCriteria.text);
  }, [getHighlightedText, note.text, searchCriteria]);

  const createdAt = useMemo(() => {
    return format(note.createdAt, 'yyyy/MM/dd');
  }, [note.createdAt]);

  const updatedAt = useMemo(() => {
    return format(note.updatedAt, 'yyyy/MM/dd');
  }, [note.updatedAt]);

  return (
    <ListItem itemId={itemId} onKeyDown={handleKeyDown} ref={refs.current[0]}>
      <GridContainer>
        <NoteTextContainer>
          <TitleText variant="h4">
            <span data-testid="title">{title}</span>
          </TitleText>
          <NoteText data-testid="text">{text}</NoteText>
          <MetaData>
            <MetaText>{`作成日: ${createdAt}`}</MetaText>
            <MetaText>{`更新日: ${updatedAt}`}</MetaText>
          </MetaData>
        </NoteTextContainer>
        <MenuContainer>
          <MenuItem>
            <RemoveNoteDialog
              targetNoteIds={[itemId]}
              tabIndex={-1}
              ref={refs.current[1]}
            />
          </MenuItem>
          <MenuItem>
            <UpdateNoteDialog
              defaultNoteId={note.id}
              tabIndex={-1}
              ref={refs.current[2]}
            />
          </MenuItem>
        </MenuContainer>
      </GridContainer>
    </ListItem>
  );
};

export { NoteListItem };
