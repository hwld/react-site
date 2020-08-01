import React from 'react';
import { RemoveNoteDialog } from './RemoveNoteDialog';
import { render, fireEvent } from '../../../test-util';
import {
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../context/NotesContext';

describe('<RemoveNoteDialog>', () => {
  test('メモの削除処理が正しく呼び出される', () => {
    const removeNotes = jest.fn();
    const { getByTestId } = render(
      <NotesContextProvider
        value={{
          ...notesContextDefaultValue,
          removeNotes,
        }}
      >
        <RemoveNoteDialog targetNoteIds={['note1']} />
      </NotesContextProvider>,
    );

    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('doneButton'));
    expect(removeNotes.mock.calls.length).toBe(1);
    expect(removeNotes.mock.calls[0][0]).toEqual(['note1']);
  });
});
