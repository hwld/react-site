import React from 'react';
import {
  NotesContextValue,
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../../context/NotesContext';
import { render } from '../../../../test-util';
import { ResultNotesColumn } from './ResultNotesColumn';
import { SearchNotesCriteria } from '../../../../repositories/notes';

describe('<ResultNotesColumn>', () => {
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'note2',
        genreId: 'genre1',
        title: 'title1',
        text: 'text1',
        authorName: 'authorName1',
        bookName: 'bookName1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  const defaultCriteria: SearchNotesCriteria = {
    genreId: '',
    title: '',
    text: '',
    authorName: '',
    bookName: '',
  };

  test('ジャンルIDで検索可能', () => {
    const { queryAllByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <ResultNotesColumn
          searchCriteria={{
            ...defaultCriteria,
            genreId: 'genre1',
          }}
        />
      </NotesContextProvider>,
    );
    expect(queryAllByText(/title1/)).toBeTruthy();
  });

  test('タイトルで検索可能', () => {
    const { queryAllByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <ResultNotesColumn
          searchCriteria={{
            ...defaultCriteria,
            title: 'title1',
          }}
        />
      </NotesContextProvider>,
    );
    expect(queryAllByText(/title1/)).toBeTruthy();
  });

  test('メモで検索可能', () => {
    const { queryAllByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <ResultNotesColumn
          searchCriteria={{
            ...defaultCriteria,
            text: 'text1',
          }}
        />
      </NotesContextProvider>,
    );
    expect(queryAllByText(/text1/)).toBeTruthy();
  });

  test('著者名で検索可能', () => {
    const { queryAllByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <ResultNotesColumn
          searchCriteria={{
            ...defaultCriteria,
            authorName: 'authorName1',
          }}
        />
      </NotesContextProvider>,
    );
    expect(queryAllByText(/authorName1/)).toBeTruthy();
  });

  test('書籍名で検索可能', () => {
    const { queryAllByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <ResultNotesColumn
          searchCriteria={{
            ...defaultCriteria,
            bookName: 'bookName1',
          }}
        />
      </NotesContextProvider>,
    );
    expect(queryAllByText(/bookName1/)).toBeTruthy();
  });
});
