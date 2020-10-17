import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import { UpdateCategoryDialog } from './UpdateCategoryDialog';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import {
  CategoryField,
  getDefaultCategoryService,
} from '../../../../services/categories';
import { getDefaultNotesSortOrder } from '../../../../services/notes';

describe('<UpdateCategoryDialog>', () => {
  test('カテゴリー更新処理が適切に呼び出される', () => {
    const updateCategory = jest.fn(
      (category: CategoryField & { id: string }) => category,
    );
    const { getByTestId, getByLabelText } = render(
      <CategoriesContextProvider
        value={{
          ...getDefaultCategoryService(),
          categories: [
            {
              categoryName: 'testCategory',
              id: 'testCategory',
              createdAt: new Date(),
              parentCategoryId: '',
              childrenCategoryIds: [],
              notesSortOrder: getDefaultNotesSortOrder(),
            },
          ],
          updateCategory,
        }}
      >
        <UpdateCategoryDialog defaultCategoryId="testCategory" />
      </CategoriesContextProvider>,
    );
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.change(getByLabelText('カテゴリー名'), {
      target: { value: 'updatedCategoryName' },
    });
    fireEvent.click(getByTestId('doneButton'));

    expect(updateCategory.mock.calls.length).toBe(1);
    expect(updateCategory.mock.calls[0][0].categoryName).toBe(
      'updatedCategoryName',
    );
  });
});
