import React from 'react';
import { render } from '../../../../test-util';
import { NoteListItem } from './NoteListItem';

describe('<NoteListItem>', () => {
  test('検索結果のハイライトが当てられている', () => {
    const { getAllByLabelText } = render(
      <NoteListItem
        itemId=""
        note={{
          id: '',
          categoryId: '',
          title: 'title1',
          text: 'text1',
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
        searchCriteria={{
          categoryId: '',
          title: 'title1',
          text: 'text1',
        }}
      />,
    );

    expect(
      getAllByLabelText('search-highlight').some(
        element => element.textContent === 'title1',
      ),
    ).toBeTruthy();

    expect(
      getAllByLabelText('search-highlight').some(
        element => element.textContent === 'text1',
      ),
    ).toBeTruthy();
  });
});
