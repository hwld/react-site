import React from 'react';
import { render, fireEvent } from '../../../test-util';
import MoveNotesDialog from './MoveNotesDialog';
import GenresContext from '../../../context/GenresContext';
import NotesContext from '../../../context/NotesContext';

describe('<MoveNotesDialog>', () => {
  test('メモの移動処理が正しく呼び出される', () => {
    const moveNote = jest.fn((nodeId: string, destGenreId: string) => ({
      nodeId,
      destGenreId,
    }));
    const others = jest.fn();

    const { getByTestId } = render(
      <GenresContext.Provider
        value={{
          genres: [
            {
              genreName: 'testGenreName',
              creationDate: new Date(),
              id: 'testGenre',
              parentGenreId: '',
              childrenGenreIds: [],
            },
          ],
          addGenre: others,
          removeGenre: others,
          moveGenre: others,
          updateGenre: others,
        }}
      >
        <NotesContext.Provider
          value={{
            notes: [],
            addNote: others,
            removeNote: others,
            updateNote: others,
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
