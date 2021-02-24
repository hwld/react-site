import React, {
  useState,
  forwardRef,
  PropsWithChildren,
  useMemo,
  useCallback,
} from 'react';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { NoteList } from '../../ui/NoteList/NoteList';
import { ContentColumn } from '../../ui/ContentColumn';
import { NotesViewMenu } from './NotesViewMenu';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { NotesSortOrder } from '../../../../services/notes';
import { useCategoriesContext } from '../../../../context/CategoriesContext';

type Props = {
  selectedCategoryIds: string[];
  focusedId?: string;
  onSetFocusedId?: (id: string | null) => void;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

const Component = forwardRef<HTMLUListElement, PropsWithChildren<Props>>(
  function NotesView(
    { selectedCategoryIds, focusedId, onSetFocusedId, className, onKeyDown },
    ref,
  ) {
    const { isMobile } = useAppStateContext();
    const { notes } = useNotesContext();
    const {
      categories,
      updateNotesSortOrderInCategory,
    } = useCategoriesContext();
    const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
    // カテゴリーが複数選択されている場合にはこっちのソート順を使用する
    const [internalNotesSortOrder, setInternalNotesSortOrder] = useState<
      NotesSortOrder
    >({
      targetField: 'createdAt',
      order: 'asc',
    });

    const notesSortOrder: NotesSortOrder = useMemo(() => {
      // カテゴリーの選択状態を外部に保存しているのでカテゴリーが読み込まれる前にlengthが1になる可能性があり、例外を出してしまう.
      if (selectedCategoryIds.length === 1 && categories.length !== 0) {
        const selectedCategory = categories.find(
          g => g.id === selectedCategoryIds[0],
        );
        if (!selectedCategory) {
          throw new Error('存在しないカテゴリーが選択されています');
        }

        return selectedCategory.notesSortOrder;
      }

      return internalNotesSortOrder;
    }, [categories, internalNotesSortOrder, selectedCategoryIds]);

    const setNotesSortOrder = useCallback(
      (order: NotesSortOrder) => {
        if (selectedCategoryIds.length === 1) {
          updateNotesSortOrderInCategory({
            order: order.order,
            targetField: order.targetField,
            id: selectedCategoryIds[0],
          });
        } else {
          setInternalNotesSortOrder(order);
        }
      },
      [selectedCategoryIds, updateNotesSortOrderInCategory],
    );

    const viewNotes = useMemo(() => {
      return notes.filter(note =>
        selectedCategoryIds.includes(note.categoryId),
      );
    }, [notes, selectedCategoryIds]);

    return (
      <ContentColumn
        className={className}
        isMobile={isMobile}
        footerMenu={
          <NotesViewMenu
            selectedCategoryIds={selectedCategoryIds}
            selectedNoteIds={selectedNoteIds}
            defaultNotesSortOrder={notesSortOrder}
            sortNotes={setNotesSortOrder}
          />
        }
      >
        {selectedCategoryIds.length !== 0 ? (
          <NoteList
            draggable
            notes={viewNotes}
            selectedNoteIds={selectedNoteIds}
            onNotesSelect={setSelectedNoteIds}
            focusedId={focusedId}
            onSetFocusedId={onSetFocusedId}
            onKeyDown={onKeyDown}
            notesSortOrder={notesSortOrder}
            ref={ref}
            isMobile={isMobile}
          />
        ) : (
          <Alert
            className={`${className}_alert`}
            severity="warning"
            aria-label="noselectedAlert"
          >
            カテゴリーを選択してください
          </Alert>
        )}
      </ContentColumn>
    );
  },
);

const StyledComponent = styled(Component)`
  &_alert {
    margin: 20px auto;
    width: 80%;
  }
`;

export const NotesView = StyledComponent;
