import React, { forwardRef, PropsWithChildren } from 'react';
import { CategoryTreeList } from '../../ui/CategoryTreeList';
import { ContentColumn } from '../../ui/ContentColumn';
import { CategoriesViewMenu } from './CategoriesViewMenu';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { useAppStateContext } from '../../../../context/AppStateContext';

type Props = {
  onCategorySelect: (selectedId: string[]) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
  selectedCategoryIds: string[];
  className?: string;
};

const Component = forwardRef<HTMLUListElement, PropsWithChildren<Props>>(
  function CategoriesView(
    { onCategorySelect, selectedCategoryIds, className, onKeyDown },
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
        />
      </ContentColumn>
    );
  },
);

export const CategoriesView = Component;
