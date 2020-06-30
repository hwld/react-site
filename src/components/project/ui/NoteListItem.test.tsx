import React from 'react';
import { render } from '../../../test-util';
import NoteList from './NoteList';
import NoteListItem from './NoteListItem';

describe('<NoteListItem>', () => {
  test('検索結果のハイライトが当てられている', () => {
    const { getAllByTestId } = render(
      <NoteListItem
        note={{
          id: '',
          genreId: '',
          title: 'title1',
          text: 'text1',
          authorName: 'author1',
          bookName: 'book1',
          creationDate: new Date(),
          lastUpdated: new Date(),
        }}
        searchCriteria={{
          genreId: '',
          title: 'title1',
          text: 'text1',
          authorName: 'author1',
          bookName: 'book1',
        }}
      />,
    );

    expect(
      getAllByTestId('search-highlight').some(
        element => element.textContent === 'title1',
      ),
    ).toBeTruthy();

    expect(
      getAllByTestId('search-highlight').some(
        element => element.textContent === 'text1',
      ),
    ).toBeTruthy();

    expect(
      getAllByTestId('search-highlight').some(
        element => element.textContent === 'author1',
      ),
    ).toBeTruthy();

    expect(
      getAllByTestId('search-highlight').some(
        element => element.textContent === 'book1',
      ),
    ).toBeTruthy();
  });
});
