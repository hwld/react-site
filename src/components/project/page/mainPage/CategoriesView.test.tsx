import React, { useState } from 'react';
import { render, dragAndDrop } from '../../../../test-util';
import { CategoriesView } from './CategoriesView';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import { getDefaultNotesSortOrder } from '../../../../services/notes';
import { CategoryService } from '../../../../services/categories';

describe('<CategoriesView>', () => {
  const CategoryViewTest: React.FC<{
    moveCategories: CategoryService['moveCategories'];
  }> = ({ moveCategories }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <CategoriesContextProvider
        value={{
          categories: [
            {
              categoryName: 'category1',
              id: 'category1',
              childrenCategoryIds: [],
              parentCategoryId: '',
              createdAt: new Date(),
              notesSortOrder: getDefaultNotesSortOrder(),
            },
            {
              categoryName: 'category2',
              id: 'category2',
              childrenCategoryIds: [],
              parentCategoryId: '',
              createdAt: new Date(),
              notesSortOrder: getDefaultNotesSortOrder(),
            },
          ],
          moveCategories,
        }}
      >
        <CategoriesView
          selectedCategoryIds={selectedIds}
          onCategorySelect={setSelectedIds}
        />
      </CategoriesContextProvider>
    );
  };
  test('コンテキストに含まれるmoveCategoryが正しく呼び出されている', () => {
    const moveCategories = jest.fn(
      (sourceCategoryIds: string[], destCategoryId: string) => ({
        sourceCategoryIds,
        destCategoryId,
      }),
    );
    const { getByTestId } = render(
      <CategoryViewTest moveCategories={moveCategories} />,
    );
    dragAndDrop(
      getByTestId('dragLayer-category2'),
      getByTestId('dropLayer-category1'),
    );
    expect(moveCategories.mock.calls.length).toBe(1);
  });
});
