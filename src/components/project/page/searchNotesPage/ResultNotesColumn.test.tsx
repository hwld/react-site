import React from 'react';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { render } from '../../../../test-util';
import { ResultNotesColumn } from './ResultNotesColumn';
import {
  getDefaultNoteService,
  NoteService,
  SearchNotesCriteria,
} from '../../../../services/notes';

describe('<ResultNotesColumn>', () => {
  const notesContextValue: NoteService = {
    ...getDefaultNoteService(),
    notes: [
      {
        id: 'note1',
        categoryId: 'category1',
        title: 'title1',
        text: 'text1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'note2',
        categoryId: 'category1',
        title: 'title1',
        text: 'text1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  const defaultCriteria: SearchNotesCriteria = {
    categoryId: '',
    title: '',
    text: '',
  };

  test('カテゴリーIDで検索可能', () => {
    const { queryAllByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <ResultNotesColumn
          searchCriteria={{
            ...defaultCriteria,
            categoryId: 'category1',
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
          }}
        />
      </NotesContextProvider>,
    );
    expect(queryAllByText(/bookName1/)).toBeTruthy();
  });
});
