import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import SearchForm from './SearchForm';
import { SearchNotesCriteria } from '../../../../services/notes';
import GenresContext, {
  genresContextDefaultValue,
} from '../../../../context/GenresContext';

describe('<SearchForm />', () => {
  test('検索処理が正しく呼び出される', () => {
    const search = jest.fn((criteria: SearchNotesCriteria) => criteria);
    const { getByLabelText, getByTestId } = render(
      <GenresContext.Provider
        value={{
          ...genresContextDefaultValue,
          genres: [
            {
              genreName: 'testGenreName',
              id: 'testGenreId',
              childrenGenreIds: [],
              parentGenreId: '',
              creationDate: new Date(),
            },
          ],
        }}
      >
        <SearchForm search={search} />
      </GenresContext.Provider>,
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
    fireEvent.change(getByLabelText('著者名'), {
      target: { value: 'testAuthorName' },
    });
    fireEvent.change(getByLabelText('書籍名'), {
      target: { value: 'testBookName' },
    });
    fireEvent.click(getByTestId('searchButton'));

    expect(search.mock.calls.length).toBe(1);
    expect(search.mock.calls[0][0].genreId).toBe('testGenreId');
    expect(search.mock.calls[0][0].title).toBe('testTitle');
    expect(search.mock.calls[0][0].text).toBe('testText');
    expect(search.mock.calls[0][0].authorName).toBe('testAuthorName');
    expect(search.mock.calls[0][0].bookName).toBe('testBookName');
  });
});
