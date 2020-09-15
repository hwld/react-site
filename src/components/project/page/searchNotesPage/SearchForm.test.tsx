import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import { SearchForm } from './SearchForm';
import { GenresContextProvider } from '../../../../context/GenresContext';
import { SearchNotesCriteria } from '../../../../types/note';

describe('<SearchForm />', () => {
  test('検索処理が正しく呼び出される', () => {
    const search = jest.fn((criteria: SearchNotesCriteria) => criteria);
    const { getByLabelText, getByTestId } = render(
      <GenresContextProvider
        value={{
          addGenre: () => {},
          moveGenres: () => {},
          removeGenres: () => {},
          updateGenre: () => {},
          genres: [
            {
              genreName: 'testGenreName',
              id: 'testGenreId',
              childrenGenreIds: [],
              parentGenreId: '',
              createdAt: new Date(),
            },
          ],
        }}
      >
        <SearchForm search={search} />
      </GenresContextProvider>,
    );

    fireEvent.click(getByTestId('activator'));
    fireEvent.click(getByTestId('clickLayer-testGenreId'));
    fireEvent.click(getByTestId('selectButton'));

    fireEvent.change(getByLabelText('タイトル'), {
      target: { value: 'testTitle' },
    });
    fireEvent.change(getByLabelText('メモ'), {
      target: { value: 'testText' },
    });
    fireEvent.click(getByTestId('searchButton'));

    expect(search.mock.calls.length).toBe(1);
    expect(search.mock.calls[0][0].genreId).toBe('testGenreId');
    expect(search.mock.calls[0][0].title).toBe('testTitle');
    expect(search.mock.calls[0][0].text).toBe('testText');
  });
});
