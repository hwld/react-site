import React, { forwardRef, PropsWithChildren } from 'react';
import {
  CategoryTreeList,
  CategoryTreeListProps,
} from '../../ui/CategoryTree/CategoryTreeList';
import { ContentColumn } from '../../ui/ContentColumn';
import { CategoriesViewMenu } from './CategoriesViewMenu';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';

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

  const handleExpand = (ids: string[]) => {
    setExpandedIds(ids);
  };

  return (
    <ContentColumn
      className={className}
      footerMenu={
        <CategoriesViewMenu selectedCategoryIds={selectedCategoryIds} />
      }
    >
      <CategoryTreeList
        draggable
        multiple
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        expanded={expandedIds}
        onExpand={handleExpand}
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
