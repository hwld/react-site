import React from 'react';
import { render, fireEvent } from '../../../test-util';
import { RemoveGenreDialog } from './RemoveCategoryDIalog';
import { GenresContextProvider } from '../../../context/CategoriesContext';
import { getDefaultGenreService } from '../../../services/categories';

describe('<RemoveGenreDialog>', () => {
  test('カテゴリーの削除処理が正しく呼ばれる', () => {
    const removeGenres = jest.fn();
    const { getByTestId } = render(
      <GenresContextProvider
        value={{
          ...getDefaultGenreService(),
          removeGenres,
        }}
      >
        <RemoveGenreDialog targetGenreIds={['genre1']} />
      </GenresContextProvider>,
    );

    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('doneButton'));

    expect(removeGenres.mock.calls.length).toBe(1);
    expect(removeGenres.mock.calls[0][0]).toEqual(['genre1']);
  });
});
