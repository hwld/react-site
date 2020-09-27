import React, { useState, forwardRef, PropsWithChildren, useMemo } from 'react';
import Alert from '@material-ui/lab/Alert';
import { NoteList } from '../../ui/NoteList';
import { ContentColumn } from '../../ui/ContentColumn';
import { NotesViewMenu } from './NotesViewMenu';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { NotesSortOrder } from '../../../../services/notes';

interface NotesViewProps {
  selectedGenreIds: string[];
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
}

export const NotesView = forwardRef<
  HTMLUListElement,
  PropsWithChildren<NotesViewProps>
>(function NotesView({ selectedGenreIds, className, onKeyDown }, ref) {
  const { isMobile } = useAppStateContext();
  const { notes } = useNotesContext();
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [notesSortOrder, setNotesSortOrder] = useState<NotesSortOrder>({
    targetField: 'createdAt',
    order: 'asc',
  });

  const viewNotes = useMemo(() => {
    return notes.filter(note => selectedGenreIds.includes(note.genreId));
  }, [notes, selectedGenreIds]);

  const notesContent = useMemo(() => {
    return selectedGenreIds.length !== 0 ? (
      <>
        <NoteList
          draggable
          notes={viewNotes}
          selectedNoteIds={selectedNoteIds}
          onNotesSelect={setSelectedNoteIds}
          onKeyDown={onKeyDown}
          notesSortOrder={notesSortOrder}
          ref={ref}
        />
      </>
    ) : (
      <Alert severity="warning" data-testid="noselectedAlert">
        ジャンルを選択してください
      </Alert>
    );
  }, [
    notesSortOrder,
    onKeyDown,
    ref,
    selectedGenreIds.length,
    selectedNoteIds,
    viewNotes,
  ]);

  return (
    <ContentColumn
      className={className}
      isMobile={isMobile}
      footerMenu={
        <NotesViewMenu
          selectedGenreIds={selectedGenreIds}
          selectedNoteIds={selectedNoteIds}
          defaultNotesSortOrder={notesSortOrder}
          sortNotes={setNotesSortOrder}
        />
      }
    >
      {notesContent}
    </ContentColumn>
  );
});
