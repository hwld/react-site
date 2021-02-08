import React, { useMemo, useCallback, useRef, createRef } from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ListItem } from '../../ui/List/ListItem';
import { Note, SearchNotesCriteria } from '../../../services/notes';
import { OpenRemoveNotesDialogButton } from '../operation/removeNotes/OpenRemoveNotesDialog';
import { OpenUpdateNoteDialogButton } from '../operation/updateNote/OpenUpdateNoteDialogButton';

type Props = {
  note: Note;
  itemId: string;
  searchCriteria?: SearchNotesCriteria;
  className?: string;
};
const Component: React.FC<Props> = ({
  note,
  itemId,
  searchCriteria,
  className,
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
            <span className="highlight" key={i} data-testid="search-highlight">
              {part}
            </span>
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
    <ListItem
      itemId={itemId}
      onKeyDown={handleKeyDown}
      ref={refs.current[0]}
      // isMobile={isMobile}
      className={className}
    >
      <div className="itemRoot">
        <div className="noteContainer">
          <Typography className="title" variant="h4" data-testid="title">
            {title}
          </Typography>
          <Typography className="text" data-testid="text">
            {text}
          </Typography>
          <div className="metaData">
            <Typography className="metaText">{`作成日: ${createdAt}`}</Typography>
            <Typography className="metaText">{`更新日: ${updatedAt}`}</Typography>
          </div>
        </div>
        <div className="menuContainer">
          <span className="menuItem">
            <OpenRemoveNotesDialogButton
              targetNoteIds={[itemId]}
              tabIndex={-1}
              ref={refs.current[1]}
            />
          </span>
          <span className="menuItem">
            <OpenUpdateNoteDialogButton
              defaultNoteId={note.id}
              tabIndex={-1}
              ref={refs.current[2]}
            />
          </span>
        </div>
      </div>
    </ListItem>
  );
};

const StyledComponent = styled(Component)<{ isMobile?: boolean }>`
  margin: ${props => (props.isMobile ? '10px' : '30px')};

  & .highlight {
    background-color: ${props => props.theme.palette.secondary.light};
    color: ${props => props.theme.palette.primary.main};
  }

  & .itemRoot {
    width: 100%;
    display: grid;
    grid-template-columns: 85% 15%;
    align-items: flex-start;

    & .noteContainer {
      padding-left: 20px;
      word-break: break-all;

      & .title {
        font-size: 2em;
        font-weight: bold;
      }

      & .text {
        white-space: pre-line;
        font-size: 1.2em;
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
      }

      & .metaData {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        & .metaText {
          font-size: 1em;
          color: #c0c0c0;
          margin-right: 10px;
        }
      }
    }

    & .menuContainer {
      height: 100%;
      line-height: 60px;

      & .menuItem {
        margin-left: 10px;
      }
    }
  }
`;

export const NoteListItem = StyledComponent;
