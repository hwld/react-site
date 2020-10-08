import React from 'react';
import { render } from '../../../../test-util';
import { NotesView } from './NotesView';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { NoteService } from '../../../../services/notes';

describe('<NotesView>', () => {
  const notesContextValue: NoteService = {
    addNote: () => {},
    moveNotes: () => {},
    removeNotes: () => {},
    updateNote: () => {},
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
        categoryId: 'category2',
        title: 'title2',
        text: 'text2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  test('単一選択されているカテゴリーのメモが表示される', () => {
    const { queryByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <NotesView selectedCategoryIds={['category1']} />
      </NotesContextProvider>,
    );
    expect(queryByText(/title1/)).toBeTruthy();
    expect(queryByText(/text1/)).toBeTruthy();

    expect(queryByText(/title2/)).toBeFalsy();
    expect(queryByText(/text2/)).toBeFalsy();
  });
  test('複数選択されているカテゴリーのメモが表示される', () => {
    const { queryByText } = render(
      <NotesContextProvider value={notesContextValue}>
        <NotesView selectedCategoryIds={['category1', 'category2']} />
      </NotesContextProvider>,
    );
    expect(queryByText(/title1/)).toBeTruthy();
    expect(queryByText(/text1/)).toBeTruthy();

    expect(queryByText(/title2/)).toBeTruthy();
    expect(queryByText(/text2/)).toBeTruthy();
  });
  test('カテゴリーを選択していないときにはメモは表示されず、アラートが表示される', () => {
    const { queryByTestId, queryByText } = render(
      <NotesView selectedCategoryIds={[]} />,
    );

    expect(queryByText(/title1/)).toBeFalsy();
    expect(queryByText(/text1/)).toBeFalsy();

    expect(queryByText(/title2/)).toBeFalsy();
    expect(queryByText(/text2/)).toBeFalsy();

    expect(queryByTestId('noselectedAlert')).toBeTruthy();
  });
});
