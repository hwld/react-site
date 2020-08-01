import React from 'react';
import { render, fireEvent } from '../../../test-util';
import { MoveNotesDialog } from './MoveNotesDialog';
import {
  genresContextDefaultValue,
  GenresContextProvider,
} from '../../../context/GenresContext';
import {
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../context/NotesContext';

describe('<MoveNotesDialog>', () => {
  test('メモの移動処理が正しく呼び出される', () => {
    const moveNotes = jest.fn();
    const { getByTestId } = render(
      <GenresContextProvider
        value={{
          ...genresContextDefaultValue,
          genres: [
            {
              genreName: 'testGenreName',
              createdAt: new Date(),
              id: 'testGenre',
              parentGenreId: '',
              childrenGenreIds: [],
            },
          ],
        }}
      >
        <NotesContextProvider
          value={{
            ...notesContextDefaultValue,
            moveNotes,
          }}
        >
          <MoveNotesDialog sourceNoteIds={['noteId']} />
        </NotesContextProvider>
      </GenresContextProvider>,
    );

    // ダイアログを開く
    fireEvent.click(getByTestId('activatorButton'));

    // 移動先ジャンルを選択する
    fireEvent.click(getByTestId('clickLayer-testGenre'));

    // 移動させる
    fireEvent.click(getByTestId('doneButton'));

    expect(moveNotes.mock.calls[0][0]).toEqual(['noteId']);
    expect(moveNotes.mock.calls[0][1]).toBe('testGenre');
  });
});
