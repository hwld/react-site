import React from 'react';
import { RemoveNotesDialog } from './RemoveNotesDialog';
import { render, fireEvent } from '../../../../test-util';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { getDefaultNoteService } from '../../../../services/notes';

describe('<RemoveNoteDialog>', () => {
  test('メモの削除処理が正しく呼び出される', () => {
    const removeNotes = jest.fn();
    const { getByTestId } = render(
      <NotesContextProvider
        value={{
          ...getDefaultNoteService(),
          removeNotes,
        }}
      >
        <RemoveNotesDialog targetNoteIds={['note1']} />
      </NotesContextProvider>,
    );

    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('doneButton'));
    expect(removeNotes.mock.calls.length).toBe(1);
    expect(removeNotes.mock.calls[0][0]).toEqual(['note1']);
  });
});
