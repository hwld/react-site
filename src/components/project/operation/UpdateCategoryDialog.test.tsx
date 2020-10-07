import React from 'react';
import { render, fireEvent } from '../../../test-util';
import { UpdateGenreDialog } from './UpdateCategoryDialog';
import { GenresContextProvider } from '../../../context/CategoriesContext';
import { GenreField, getDefaultGenreService } from '../../../services/categories';
import { getDefaultNotesSortOrder } from '../../../services/notes';

describe('<UpdateGenreDialog>', () => {
  test('カテゴリー更新処理が適切に呼び出される', () => {
    const updateGenre = jest.fn((genre: GenreField & { id: string }) => genre);
    const { getByTestId, getByLabelText } = render(
      <GenresContextProvider
        value={{
          ...getDefaultGenreService(),
          genres: [
            {
              genreName: 'testGenre',
              id: 'testGenre',
              createdAt: new Date(),
              parentGenreId: '',
              childrenGenreIds: [],
              notesSortOrder: getDefaultNotesSortOrder(),
            },
          ],
          updateGenre,
        }}
      >
        <UpdateGenreDialog defaultGenreId="testGenre" />
      </GenresContextProvider>,
    );
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.change(getByLabelText('カテゴリー名'), {
      target: { value: 'updatedGenreName' },
    });
    fireEvent.click(getByTestId('doneButton'));

    expect(updateGenre.mock.calls.length).toBe(1);
    expect(updateGenre.mock.calls[0][0].genreName).toBe('updatedGenreName');
  });
});
