import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import { AddCategoryDialog } from './AddCategoryDialog';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import {
  CategoryField,
  getDefaultCategoryService,
} from '../../../../services/categories';

describe('<AddCategoryDialog>', () => {
  test('カテゴリー追加処理が適切に呼び出される', () => {
    const addCategory = jest.fn(
      (parentId: string, categoryField: CategoryField) => ({
        parentId,
        categoryField,
      }),
    );
    const { getByTestId, getByLabelText } = render(
      <CategoriesContextProvider
        value={{
          ...getDefaultCategoryService(),
          addCategory,
        }}
      >
        <AddCategoryDialog parentCategoryId="category1" />
      </CategoriesContextProvider>,
    );

    // ダイアログ表示
    fireEvent.click(getByTestId('activatorButton'));

    // カテゴリーの情報を設定
    fireEvent.change(getByLabelText('カテゴリー名'), {
      target: { value: 'TestCategoryName' },
    });

    // 追加ボタンを押す
    fireEvent.click(getByTestId('doneButton'));

    // カテゴリーの追加が呼び出されているか
    expect(addCategory.mock.calls.length).toBe(1);
    expect(addCategory.mock.calls[0][1].categoryName).toBe('TestCategoryName');
  });
});
