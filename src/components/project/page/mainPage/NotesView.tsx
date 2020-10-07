import React, {
  useState,
  forwardRef,
  PropsWithChildren,
  useMemo,
  useCallback,
} from 'react';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { NoteList } from '../../ui/NoteList';
import { ContentColumn } from '../../ui/ContentColumn';
import { NotesViewMenu } from './NotesViewMenu';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { NotesSortOrder } from '../../../../services/notes';
import { useGenresContext } from '../../../../context/GenresContext';

const StyledAlert = styled(Alert)`
  margin: 20px auto;
  width: 80%;
`;

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
  const { genres, updateNotesSortOrderInGenre } = useGenresContext();
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  // ジャンルが複数選択されている場合にはこっちのソート順を使用する
  const [internalNotesSortOrder, setInternalNotesSortOrder] = useState<
    NotesSortOrder
  >({
    targetField: 'createdAt',
    order: 'asc',
  });

  const notesSortOrder: NotesSortOrder = useMemo(() => {
    // ジャンルの選択状態を外部に保存しているのでジャンルが読み込まれる前にlengthが1になる可能性があり、例外を出してしまう.
    if (selectedGenreIds.length === 1 && genres.length !== 0) {
      const selectedGenre = genres.find(g => g.id === selectedGenreIds[0]);
      if (!selectedGenre) {
        throw new Error('存在しないジャンルが選択されています');
      }

      return selectedGenre.notesSortOrder;
    }

    return internalNotesSortOrder;
  }, [genres, internalNotesSortOrder, selectedGenreIds]);

  const setNotesSortOrder = useCallback(
    (order: NotesSortOrder) => {
      if (selectedGenreIds.length === 1) {
        updateNotesSortOrderInGenre({
          order: order.order,
          targetField: order.targetField,
          id: selectedGenreIds[0],
        });
      } else {
        setInternalNotesSortOrder(order);
      }
    },
    [selectedGenreIds, updateNotesSortOrderInGenre],
  );

  const viewNotes = useMemo(() => {
    return notes.filter(note => selectedGenreIds.includes(note.genreId));
  }, [notes, selectedGenreIds]);

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
      {selectedGenreIds.length !== 0 ? (
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
        <StyledAlert severity="warning" data-testid="noselectedAlert">
          ジャンルを選択してください
        </StyledAlert>
      )}
    </ContentColumn>
  );
});
