import React from 'react';
import { render, fireEvent } from '../../../test-util';
import UpdateGenreDialog from './UpdateGenreDialog';
import GenresContext from '../../../context/GenresContext';
import { Genre } from '../../../services/genres';

describe('<UpdateGenreDialog>', () => {
  test('ジャンル更新処理が適切に呼び出される', () => {
    const updateGenre = jest.fn((genre: Genre) => genre);
    const others = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <GenresContext.Provider
        value={{
          genres: [],
          addGenre: others,
          removeGenre: others,
          updateGenre,
          moveGenre: others,
        }}
      >
        <UpdateGenreDialog
          defaultGenre={{
            genreName: 'testGenre',
            id: 'testGenre',
            creationDate: new Date(),
            parentGenreId: '',
            childrenGenreIds: [],
          }}
        />
      </GenresContext.Provider>,
    );
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.change(getByLabelText('ジャンル名'), {
      target: { value: 'updatedGenreName' },
    });
    fireEvent.click(getByTestId('doneButton'));

    expect(updateGenre.mock.calls.length).toBe(1);
    expect(updateGenre.mock.calls[0][0].genreName).toBe('updatedGenreName');
  });
});
