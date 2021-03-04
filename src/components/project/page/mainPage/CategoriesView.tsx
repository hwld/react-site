import React, { forwardRef, PropsWithChildren } from 'react';
import {
  CategoryTreeList,
  CategoryTreeListProps,
} from '../../ui/CategoryTree/CategoryTreeList';
import { ContentColumn } from '../common/ContentColumn';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';
import { OpenAddCategoryDialogButton } from '../../operation/addCategory/OpenAddCategoryDialogButton';
import { OpenRemoveCategoriesDialogButton } from '../../operation/removeCategories/OpenRemoveCategoriesDialogButton';
import { OpenUpdateCategoryDialogButton } from '../../operation/updateCategory/OpenUpdateCategoryDialogButton';

export type CategoriesViewProps = {
  onCategorySelect: (selectedId: string[]) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
  selectedCategoryIds: string[];
  className?: string;
  focused?: CategoryTreeListProps['focused'];
  onSetFocused?: CategoryTreeListProps['onSetFocused'];
};

const Component = forwardRef<
  HTMLUListElement,
  PropsWithChildren<CategoriesViewProps>
>(function CategoriesView(
  {
    onCategorySelect,
    selectedCategoryIds,
    className,
    onKeyDown,
    focused,
    onSetFocused,
  },
  ref,
) {
  const { categories, moveCategories } = useCategoriesContext();
  const { moveNotes } = useNotesContext();
  const { expandedIds, setExpandedIds } = useAppStateContext();

  const afterAddCategory = (parentCategoryId: string) => {
    if (!expandedIds.includes(parentCategoryId)) {
      setExpandedIds([...expandedIds, parentCategoryId]);
    }
  };

  return (
    <ContentColumn
      className={className}
      footerMenu={
        <>
          <OpenAddCategoryDialogButton
            disabled={selectedCategoryIds.length > 1}
            parentCategoryId={selectedCategoryIds[0] ?? ''}
            onAfterAddCategory={afterAddCategory}
          />
          <OpenRemoveCategoriesDialogButton
            disabled={selectedCategoryIds.length === 0}
            targetCategoryIds={selectedCategoryIds}
          />
          <OpenUpdateCategoryDialogButton
            disabled={selectedCategoryIds.length !== 1}
            defaultCategoryId={selectedCategoryIds[0]}
          />
        </>
      }
    >
      <CategoryTreeList
        draggable
        multiple
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        expanded={expandedIds}
        onExpand={setExpandedIds}
        onCategorySelect={onCategorySelect}
        onCategoryDrop={moveCategories}
        onNotesDrop={moveNotes}
        onKeyDown={onKeyDown}
        ref={ref}
        focused={focused}
        onSetFocused={onSetFocused}
      />
    </ContentColumn>
  );
});

export const CategoriesView = Component;
