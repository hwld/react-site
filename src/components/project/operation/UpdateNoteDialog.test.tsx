import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test-util';
import { NoteField } from '../../../services/notes';
import {
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../context/NotesContext';
import UpdateNoteDialog from './UpdateNoteDialog';

describe('<UpdateNoteDialog>', () => {
  test('ノートの更新処理が適切に呼び出される', () => {
    const updateNote = jest.fn((id: string, noteField: NoteField) => ({
      id,
      noteField,
    }));
    const { getByTestId, getByLabelText } = render(
      <NotesContextProvider
        value={{
          ...notesContextDefaultValue,
          updateNote,
        }}
      >
        <UpdateNoteDialog
          defaultNote={{
            id: 'id',
            genreId: 'genreId',
            title: 'title',
            text: 'text',
            authorName: 'authorName',
            bookName: 'bookName',
            creationDate: new Date(),
            lastUpdated: new Date(),
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
    fireEvent.change(getByLabelText('著者名'), {
      target: { value: 'updatedAuthorName' },
    });
    fireEvent.change(getByLabelText('書籍名'), {
      target: { value: 'updatedBookName' },
    });

    fireEvent.click(getByTestId('doneButton'));

    expect(updateNote.mock.calls.length).toBe(1);
    expect(updateNote.mock.calls[0][0]).toBe('id');
    expect(updateNote.mock.calls[0][1].title).toBe('updatedTitle');
    expect(updateNote.mock.calls[0][1].text).toBe('updatedText');
    expect(updateNote.mock.calls[0][1].authorName).toBe('updatedAuthorName');
    expect(updateNote.mock.calls[0][1].bookName).toBe('updatedBookName');
  });
});
