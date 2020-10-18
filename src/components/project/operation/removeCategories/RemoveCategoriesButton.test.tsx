import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import { RemoveCategoriesButton } from './RemoveCategoriesButton';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import { getDefaultCategoryService } from '../../../../services/categories';

describe('<RemoveCategoryDialog>', () => {
  test('カテゴリーの削除処理が正しく呼ばれる', () => {
    const removeCategories = jest.fn();
    const { getByTestId } = render(
      <CategoriesContextProvider
        value={{
          ...getDefaultCategoryService(),
          removeCategories,
        }}
      >
        <RemoveCategoriesButton targetCategoryIds={['category1']} />
      </CategoriesContextProvider>,
    );

    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('doneButton'));

    expect(removeCategories.mock.calls.length).toBe(1);
    expect(removeCategories.mock.calls[0][0]).toEqual(['category1']);
  });
});
