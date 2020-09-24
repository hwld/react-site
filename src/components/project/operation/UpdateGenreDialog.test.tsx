import React from 'react';
import { render, fireEvent } from '../../../test-util';
import { UpdateGenreDialog } from './UpdateGenreDialog';
import { GenresContextProvider } from '../../../context/GenresContext';
import {
  GenreField,
  getDefaultGenreStoreService,
} from '../../../services/useGenreStoreService';

describe('<UpdateGenreDialog>', () => {
  test('ジャンル更新処理が適切に呼び出される', () => {
    const updateGenre = jest.fn((genre: GenreField & { id: string }) => genre);
    const { getByTestId, getByLabelText } = render(
      <GenresContextProvider
        value={{
          ...getDefaultGenreStoreService(),
          genres: [
            {
              genreName: 'testGenre',
              id: 'testGenre',
              createdAt: new Date(),
              parentGenreId: '',
              childrenGenreIds: [],
            },
          ],
          updateGenre,
        }}
      >
        <UpdateGenreDialog defaultGenreId="testGenre" />
      </GenresContextProvider>,
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
