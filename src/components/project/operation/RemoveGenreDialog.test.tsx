import React from 'react';
import { render, fireEvent } from '../../../test-util';
import RemoveGenreDialog from './RemoveGenreDIalog';
import {
  genresContextDefaultValue,
  GenresContextProvider,
} from '../../../context/GenresContext';

describe('<RemoveGenreDialog>', () => {
  test('ジャンルの削除処理が正しく呼ばれる', () => {
    const removeGenres = jest.fn();
    const { getByTestId } = render(
      <GenresContextProvider
        value={{
          ...genresContextDefaultValue,
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
