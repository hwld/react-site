import React, { useMemo, forwardRef } from 'react';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { NoteListItem } from './NoteListItem';
import { List } from '../../ui/List/List';
import {
  Note,
  NotesSortOrder,
  SearchNotesCriteria,
} from '../../../services/notes';
import { notesCompareFunction } from '../../../util/compareFunctions';

const StyledAlert = styled(Alert)`
  margin: 20px auto;
  width: 80%;
`;

type Props = {
  notes: Note[];
  notesSortOrder?: NotesSortOrder;
  onNotesSelect?: (selectedIds: string[]) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
  selectedNoteIds?: string[];
  searchCriteria?: SearchNotesCriteria;
  className?: string;
  draggable?: boolean;
  isMobile?: boolean;
};

const Component = forwardRef<HTMLUListElement, React.PropsWithChildren<Props>>(
  function NoteList(
    {
      notes,
      notesSortOrder = { targetField: 'updatedAt', order: 'asc' },
      selectedNoteIds = [],
      onNotesSelect,
      onKeyDown,
      searchCriteria,
      className,
      draggable = false,
      isMobile,
    },
    ref,
  ) {
    const listItems = useMemo(() => {
      return notes
        .sort(notesCompareFunction(notesSortOrder))
        .map(note => (
          <NoteListItem
            key={note.id}
            note={note}
            itemId={note.id}
            searchCriteria={searchCriteria}
            isMobile={isMobile}
          />
        ));
    }, [isMobile, notes, notesSortOrder, searchCriteria]);

    return (
      <List
        draggable={draggable}
        className={className}
        selectedIds={selectedNoteIds}
        onSelect={onNotesSelect}
        onKeyDown={onKeyDown}
        ref={ref}
      >
        {notes.length !== 0 ? (
          listItems
        ) : (
          <StyledAlert className={className} severity="warning">
            メモが存在しません
          </StyledAlert>
        )}
      </List>
    );
  },
);

export const NoteList = Component;
