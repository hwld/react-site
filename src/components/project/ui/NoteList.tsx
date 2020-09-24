import React, { useCallback, useMemo, forwardRef } from 'react';
import Alert from '@material-ui/lab/Alert';
import { NoteListItem } from './NoteListItem';
import { List } from '../../ui/List/List';
import {
  Note,
  NotesSortOrder,
  SearchNotesCriteria,
} from '../../../services/noteStoreService';

type NoteListProps = {
  notes: Note[];
  notesSortOrder?: NotesSortOrder;
  onNotesSelect?: (selectedIds: string[]) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
  selectedNoteIds?: string[];
  searchCriteria?: SearchNotesCriteria;
  className?: string;
  draggable?: boolean;
};

export const NoteList = forwardRef<
  HTMLUListElement,
  React.PropsWithChildren<NoteListProps>
>(function NoteList(
  {
    notes,
    notesSortOrder = { targetField: 'updatedAt', order: 'asc' },
    selectedNoteIds = [],
    onNotesSelect,
    onKeyDown,
    searchCriteria,
    className,
    draggable = false,
  },
  ref,
) {
  const isDate = useCallback((arg: string | Date): arg is Date => {
    return arg != null && typeof arg !== 'string';
  }, []);

  // sortOrderを受け取って、比較関数を返す.
  // note[sortOrder.targetField]がDate型のときにはgetTime()で比較し、
  // note[sortOrder.targetField]がstring型のときには直接比較する.
  const notesCompareFunction = useCallback(
    (sortOrder: NotesSortOrder) => {
      return (NoteA: Note, NoteB: Note) => {
        let BisBigger: boolean;
        let AisBigger: boolean;
        const targetObjA = NoteA[sortOrder.targetField];
        const targetObjB = NoteB[sortOrder.targetField];

        if (isDate(targetObjA) && isDate(targetObjB)) {
          AisBigger = targetObjA.getTime() > targetObjB.getTime();
          BisBigger = targetObjA.getTime() < targetObjB.getTime();
        } else {
          AisBigger = targetObjA > targetObjB;
          BisBigger = targetObjA < targetObjB;
        }

        if (AisBigger) {
          if (sortOrder.order === 'asc') {
            return 1;
          }

          return -1;
        }
        if (BisBigger) {
          if (sortOrder.order === 'asc') {
            return -1;
          }

          return 1;
        }

        return 0;
      };
    },
    [isDate],
  );

  const listItems = useMemo(() => {
    return notes
      .sort(notesCompareFunction(notesSortOrder))
      .map(note => (
        <NoteListItem
          note={note}
          itemId={note.id}
          key={note.id}
          searchCriteria={searchCriteria}
        />
      ));
  }, [notes, notesCompareFunction, notesSortOrder, searchCriteria]);

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
        <Alert className={className} severity="warning">
          メモが存在しません
        </Alert>
      )}
    </List>
  );
});
