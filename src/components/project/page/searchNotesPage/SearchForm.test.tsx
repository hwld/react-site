import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import { SearchForm } from './SearchForm';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import {
  getDefaultNotesSortOrder,
  SearchNotesCriteria,
} from '../../../../services/notes';

describe('<SearchForm />', () => {
  test('検索処理が正しく呼び出される', () => {
    const search = jest.fn((criteria: SearchNotesCriteria) => criteria);
    const { getByLabelText, getByTestId } = render(
      <CategoriesContextProvider
        value={{
          addCategory: () => {},
          moveCategories: () => {},
          removeCategories: () => {},
          updateCategory: () => {},
          updateNotesSortOrderInCategory: () => {},
          categories: [
            {
              categoryName: 'testCategoryName',
              id: 'testCategoryId',
              childrenCategoryIds: [],
              parentCategoryId: '',
              createdAt: new Date(),
              notesSortOrder: getDefaultNotesSortOrder(),
            },
          ],
        }}
      >
        <SearchForm search={search} />
      </CategoriesContextProvider>,
    );

    fireEvent.click(getByTestId('activator'));
    fireEvent.click(getByTestId('clickLayer-testCategoryId'));
    fireEvent.click(getByTestId('selectButton'));

    fireEvent.change(getByLabelText('タイトル'), {
      target: { value: 'testTitle' },
    });
    fireEvent.change(getByLabelText('メモ'), {
      target: { value: 'testText' },
    });
    fireEvent.click(getByTestId('searchButton'));

    expect(search.mock.calls.length).toBe(1);
    expect(search.mock.calls[0][0].categoryId).toBe('testCategoryId');
    expect(search.mock.calls[0][0].title).toBe('testTitle');
    expect(search.mock.calls[0][0].text).toBe('testText');
  });
});
