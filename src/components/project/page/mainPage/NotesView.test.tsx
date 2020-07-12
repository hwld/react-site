import React from 'react';
import { render } from '../../../../test-util';
import NotesView from './NotesView';
import {
  NotesContextValue,
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../../context/NotesContext';

describe('<NotesView>', () => {
  const notesContextValue: NotesContextValue = {
    ...notesContextDefaultValue,
    notes: [
      {
        id: 'note1',
        genreId: 'genre1',
        title: 'title1',
        text: 'text1',
        authorName: 'authorName1',
        bookName: 'bookName1',
        creationDate: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 'note2',
        genreId: 'genre2',
        title: 'title2',
        text: 'text2',
        authorName: 'authorName2',
        bookName: 'bookName2',
        creationDate: new Date(),
        lastUpdated: new Date(),
      },
    ],
  };

  test('単一選択されているジャンルのメモが表示される', () => {
    const { queryByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <NotesView selectedGenreIds={['genre1']} />
      </NotesContextProvider>,
    );
    expect(queryByText(/title1/)).toBeTruthy();
    expect(queryByText(/text1/)).toBeTruthy();
    expect(queryByText(/authorName1/)).toBeTruthy();
    expect(queryByText(/bookName1/)).toBeTruthy();

    expect(queryByText(/title2/)).toBeFalsy();
    expect(queryByText(/text2/)).toBeFalsy();
    expect(queryByText(/authorName2/)).toBeFalsy();
    expect(queryByText(/bookName2/)).toBeFalsy();
  });
  test('複数選択されているジャンルのメモが表示される', () => {
    const { queryByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <NotesView selectedGenreIds={['genre1', 'genre2']} />
      </NotesContextProvider>,
    );
    expect(queryByText(/title1/)).toBeTruthy();
    expect(queryByText(/text1/)).toBeTruthy();
    expect(queryByText(/authorName1/)).toBeTruthy();
    expect(queryByText(/bookName1/)).toBeTruthy();

    expect(queryByText(/title2/)).toBeTruthy();
    expect(queryByText(/text2/)).toBeTruthy();
    expect(queryByText(/authorName2/)).toBeTruthy();
    expect(queryByText(/bookName2/)).toBeTruthy();
  });
  test('ジャンルを選択していないときにはメモは表示されず、アラートが表示される', () => {
    const { queryByTestId, queryByText } = render(
      <NotesView selectedGenreIds={[]} />,
    );

    expect(queryByText(/title1/)).toBeFalsy();
    expect(queryByText(/text1/)).toBeFalsy();
    expect(queryByText(/authorName1/)).toBeFalsy();
    expect(queryByText(/bookName1/)).toBeFalsy();
    expect(queryByText(/title2/)).toBeFalsy();
    expect(queryByText(/text2/)).toBeFalsy();
    expect(queryByText(/authorName2/)).toBeFalsy();
    expect(queryByText(/bookName2/)).toBeFalsy();

    expect(queryByTestId('noselectedAlert')).toBeTruthy();
  });
});
