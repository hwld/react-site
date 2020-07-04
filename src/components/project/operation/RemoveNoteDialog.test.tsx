import React from 'react';
import RemoveNoteDialog from './RemoveNoteDialog';
import { render, fireEvent } from '../../../test-util';
import NotesContext from '../../../context/NotesContext';

describe('<RemoveNoteDialog>', () => {
  test('メモの削除処理が正しく呼び出される', () => {
    const removeNote = jest.fn();
    const others = jest.fn();
    const { getByTestId } = render(
      <NotesContext.Provider
        value={{
          notes: [],
          addNote: others,
          removeNote,
          updateNote: others,
          moveNote: others,
        }}
      >
        <RemoveNoteDialog targetNoteIds={['note1']} />
      </NotesContext.Provider>,
    );

    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('doneButton'));
    expect(removeNote.mock.calls.length).toBe(1);
    expect(removeNote.mock.calls[0][0]).toBe('note1');
  });
});