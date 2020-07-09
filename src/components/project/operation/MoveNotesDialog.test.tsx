import React from 'react';
import { render, fireEvent } from '../../../test-util';
import MoveNotesDialog from './MoveNotesDialog';
import GenresContext, {
  genresContextDefaultValue,
} from '../../../context/GenresContext';
import NotesContext, {
  notesContextDefaultValue,
} from '../../../context/NotesContext';

describe('<MoveNotesDialog>', () => {
  test('メモの移動処理が正しく呼び出される', () => {
    const moveNote = jest.fn((nodeId: string, destGenreId: string) => ({
      nodeId,
      destGenreId,
    }));
    const { getByTestId } = render(
      <GenresContext.Provider
        value={{
          ...genresContextDefaultValue,
          genres: [
            {
              genreName: 'testGenreName',
              creationDate: new Date(),
              id: 'testGenre',
              parentGenreId: '',
              childrenGenreIds: [],
            },
          ],
        }}
      >
        <NotesContext.Provider
          value={{
            ...notesContextDefaultValue,
            moveNote,
          }}
        >
          <MoveNotesDialog sourceNoteIds={['noteId']} />
        </NotesContext.Provider>
      </GenresContext.Provider>,
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
