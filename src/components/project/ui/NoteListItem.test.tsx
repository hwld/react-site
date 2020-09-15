import React from 'react';
import { render } from '../../../test-util';
import { NoteListItem } from './NoteListItem';

describe('<NoteListItem>', () => {
  test('検索結果のハイライトが当てられている', () => {
    const { getAllByTestId } = render(
      <NoteListItem
        itemId=""
        note={{
          id: '',
          genreId: '',
          title: 'title1',
          text: 'text1',
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        searchCriteria={{
          genreId: '',
          title: 'title1',
          text: 'text1',
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
  });
});
