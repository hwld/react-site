import React from 'react';
import RemoveNoteDialog from './RemoveNoteDialog';
import { render, fireEvent } from '../../../test-util';
import {
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../context/NotesContext';

describe('<RemoveNoteDialog>', () => {
  test('メモの削除処理が正しく呼び出される', () => {
    const removeNote = jest.fn();
    const { getByTestId } = render(
      <NotesContextProvider
        value={{
          ...notesContextDefaultValue,
          removeNote,
        }}
      >
        <RemoveNoteDialog targetNoteIds={['note1']} />
      </NotesContextProvider>,
    );

    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('doneButton'));
    expect(removeNote.mock.calls.length).toBe(1);
    expect(removeNote.mock.calls[0][0]).toBe('note1');
  });
});
