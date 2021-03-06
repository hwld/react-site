import React, { useMemo, forwardRef } from 'react';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { NoteListItem } from './NoteListItem';
import { List, ListProps } from '../../../ui/List/List';
import {
  Note,
  NotesSortOrder,
  SearchNotesCriteria,
} from '../../../../services/notes';
import { notesCompareFunction } from '../../../../util/compareFunctions';

export type NoteListProps = {
  notes: Note[];
  notesSortOrder?: NotesSortOrder;
  onNotesSelect?: (selectedIds: string[]) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
  selectedNoteIds?: string[];
  searchCriteria?: SearchNotesCriteria;
  focusedId?: ListProps['focused'];
  onSetFocusedId?: ListProps['onSetFocused'];
  className?: string;
  draggable?: boolean;
};

const Component = forwardRef<
  HTMLUListElement,
  React.PropsWithChildren<NoteListProps>
>(function NoteList(
  {
    notes,
    notesSortOrder = { targetField: 'updatedAt', order: 'asc' },
    selectedNoteIds = [],
    onNotesSelect,
    focusedId,
    onSetFocusedId,
    onKeyDown,
    searchCriteria,
    className,
    draggable = false,
  },
  ref,
) {
  const listItems = useMemo(() => {
    return notes.sort(notesCompareFunction(notesSortOrder)).map(note => {
      return (
        <NoteListItem
          className="noteListItem"
          key={note.id}
          note={note}
          itemId={note.id}
          searchCriteria={searchCriteria}
        />
      );
    });
  }, [notes, notesSortOrder, searchCriteria]);

  return (
    <List
      draggable={draggable}
      className={className}
      selected={selectedNoteIds}
      onSelect={onNotesSelect}
      focused={focusedId}
      onSetFocused={onSetFocusedId}
      onKeyDown={onKeyDown}
      ref={ref}
    >
      {notes.length !== 0 ? (
        listItems
      ) : (
        <Alert className="alert" severity="warning">
          メモが存在しません
        </Alert>
      )}
    </List>
  );
});

const StyledComponent = styled(Component)`
  padding: 0;

  & .noteListItem {
    margin: 15px;
  }

  & .alert {
    margin: 20px auto;
    width: 80%;
  }
`;

export const NoteList = StyledComponent;
