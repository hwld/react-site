import React from 'react';
import { render, fireEvent } from '../../../test-util';
import RemoveGenreDialog from './RemoveGenreDIalog';
import GenresContext from '../../../context/GenresContext';

describe('<RemoveGenreDialog>', () => {
  test('ジャンルの削除処理が正しく呼ばれる', () => {
    const removeGenre = jest.fn();
    const others = jest.fn();
    const { getByTestId } = render(
      <GenresContext.Provider
        value={{
          genres: [],
          addGenre: others,
          removeGenre,
          updateGenre: others,
          moveGenre: others,
        }}
      >
        <RemoveGenreDialog targetGenreIds={['genre1']} />
      </GenresContext.Provider>,
    );

    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('doneButton'));

    expect(removeGenre.mock.calls.length).toBe(1);
    expect(removeGenre.mock.calls[0][0]).toBe('genre1');
  });
});
