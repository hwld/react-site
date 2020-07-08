import React from 'react';
import NotesContext, {
  NotesContextValue,
} from '../../../../context/NotesContext';
import { render } from '../../../../test-util';
import ResultNotesList from './ResultNotesColumn';
import { SearchNotesCriteria } from '../../../../services/notes';

describe('<ResultNotesColumn>', () => {
  const notesContextValue: NotesContextValue = {
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
        genreId: 'genre1',
        title: 'title1',
        text: 'text1',
        authorName: 'authorName1',
        bookName: 'bookName1',
        creationDate: new Date(),
        lastUpdated: new Date(),
      },
    ],
    addNote: () => {},
    removeNote: () => {},
    updateNote: () => {},
    moveNote: () => {},
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
      <NotesContext.Provider value={notesContextValue}>
        <ResultNotesList
          searchCriteria={{
            ...defaultCriteria,
            genreId: 'genre1',
          }}
        />
      </NotesContext.Provider>,
    );
    expect(queryAllByText(/title1/)).toBeTruthy();
  });

  test('タイトルで検索可能', () => {
    const { queryAllByText } = render(
      <NotesContext.Provider value={notesContextValue}>
        <ResultNotesList
          searchCriteria={{
            ...defaultCriteria,
            title: 'title1',
          }}
        />
      </NotesContext.Provider>,
    );
    expect(queryAllByText(/title1/)).toBeTruthy();
  });

  test('メモで検索可能', () => {
    const { queryAllByText } = render(
      <NotesContext.Provider value={notesContextValue}>
        <ResultNotesList
          searchCriteria={{
            ...defaultCriteria,
            text: 'text1',
          }}
        />
      </NotesContext.Provider>,
    );
    expect(queryAllByText(/text1/)).toBeTruthy();
  });

  test('著者名で検索可能', () => {
    const { queryAllByText } = render(
      <NotesContext.Provider value={notesContextValue}>
        <ResultNotesList
          searchCriteria={{
            ...defaultCriteria,
            authorName: 'authorName1',
          }}
        />
      </NotesContext.Provider>,
    );
    expect(queryAllByText(/authorName1/)).toBeTruthy();
  });

  test('書籍名で検索可能', () => {
    const { queryAllByText } = render(
      <NotesContext.Provider value={notesContextValue}>
        <ResultNotesList
          searchCriteria={{
            ...defaultCriteria,
            bookName: 'bookName1',
          }}
        />
      </NotesContext.Provider>,
    );
    expect(queryAllByText(/bookName1/)).toBeTruthy();
  });
});
