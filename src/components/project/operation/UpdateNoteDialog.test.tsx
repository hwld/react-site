import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test-util';
import { NoteField } from '../../../repositories/notes';
import {
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../context/NotesContext';
import { UpdateNoteDialog } from './UpdateNoteDialog';

describe('<UpdateNoteDialog>', () => {
  test('ノートの更新処理が適切に呼び出される', () => {
    const updateNote = jest.fn((note: NoteField & { id: string }) => ({
      note,
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
    fireEvent.change(getByLabelText('著者名'), {
      target: { value: 'updatedAuthorName' },
    });
    fireEvent.change(getByLabelText('書籍名'), {
      target: { value: 'updatedBookName' },
    });

    fireEvent.click(getByTestId('doneButton'));

    expect(updateNote.mock.calls.length).toBe(1);
    expect(updateNote.mock.calls[0][0].id).toBe('id');
    expect(updateNote.mock.calls[0][0].title).toBe('updatedTitle');
    expect(updateNote.mock.calls[0][0].text).toBe('updatedText');
    expect(updateNote.mock.calls[0][0].authorName).toBe('updatedAuthorName');
    expect(updateNote.mock.calls[0][0].bookName).toBe('updatedBookName');
  });
});
