import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Note } from '../services/notes';
import NoteListItem from './NoteListItem';
import List from './util/List';
import { NotesSortOrder } from './NotesSortConditionFields';

interface NoteListProps {
  notes: Note[];
  notesSortOrder?: NotesSortOrder;
  onNotesSelect?: (selectedIds: string[]) => void;
  selectedNoteIds?: string[];
  className?: string;
}

const StyledList = styled(List)`
  overflow: auto;
  word-break: break-all;
`;

const NoteList: React.FC<NoteListProps> = ({
  notes,
  notesSortOrder = { targetField: 'creationDate', order: 'asc' },
  onNotesSelect,
  className,
}) => {
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

  const renderListItem = useCallback(() => {
    return notes
      .sort(notesCompareFunction(notesSortOrder))
      .map(note => <NoteListItem note={note} key={note.id} />);
  }, [notes, notesCompareFunction, notesSortOrder]);

  return (
    <StyledList className={className} onSelect={onNotesSelect}>
      {renderListItem()}
    </StyledList>
  );
};

export default NoteList;
