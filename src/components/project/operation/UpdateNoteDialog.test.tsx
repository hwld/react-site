import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test-util';
import { NotesContextProvider } from '../../../context/NotesContext';
import { UpdateNoteDialog } from './UpdateNoteDialog';
import { NoteField } from '../../../services/useNoteStoreService';

describe('<UpdateNoteDialog>', () => {
  test('ノートの更新処理が適切に呼び出される', () => {
    const updateNote = jest.fn((note: NoteField & { id: string }) => ({
      note,
    }));
    const { getByTestId, getByLabelText } = render(
      <NotesContextProvider
        value={{
          notes: [],
          addNote: () => {},
          removeNotes: () => {},
          updateNote,
          moveNotes: () => {},
        }}
      >
        <UpdateNoteDialog
          defaultNote={{
            id: 'id',
            genreId: 'genreId',
            title: 'title',
            text: 'text',
            createdAt: new Date(),
            updatedAt: new Date(),
          }}
        />
      </NotesContextProvider>,
    );

    fireEvent.click(getByTestId('activatorButton'));

    fireEvent.change(getByLabelText('タイトル'), {
      target: { value: 'updatedTitle' },
    });
    fireEvent.change(getByLabelText('メモ'), {
      target: { value: 'updatedText' },
    });

    fireEvent.click(getByTestId('doneButton'));

    expect(updateNote.mock.calls.length).toBe(1);
    expect(updateNote.mock.calls[0][0].id).toBe('id');
    expect(updateNote.mock.calls[0][0].title).toBe('updatedTitle');
    expect(updateNote.mock.calls[0][0].text).toBe('updatedText');
  });
});
