import React from 'react';
import { render, fireEvent } from '../../../test-util';
import MoveNotesDialog from './MoveNotesDialog';
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
    const moveNote = jest.fn((nodeId: string, destGenreId: string) => ({
      nodeId,
      destGenreId,
    }));
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
            moveNote,
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

    expect(moveNote.mock.calls[0][0]).toBe('noteId');
    expect(moveNote.mock.calls[0][1]).toBe('testGenre');
  });
});
