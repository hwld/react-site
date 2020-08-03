import React from 'react';
import { Note, NoteField } from '../../../services/useNoteStoreService';
import { render, fireEvent } from '../../../test-util';
import {
  notesContextDefaultValue,
  NotesContextProvider,
} from '../../../context/NotesContext';
import { AddNoteDialog } from './AddNoteDialog';

describe('<AddNoteDialog>', () => {
  test('ノート追加処理が適切に呼び出される', () => {
    const addNote = jest.fn((genreId: string, noteField: NoteField) => ({
      genreId,
      noteField,
    }));
    const { getByLabelText, getByTestId } = render(
      <NotesContextProvider
        value={{
          ...notesContextDefaultValue,
          notes: [
            {
              title: 'dammy',
              text: 'dammy',
              authorName: 'dammy',
              bookName: 'dammy',
              createdAt: new Date(),
              updatedAt: new Date(),
              id: 'dammy',
              genreId: 'dammy',
            },
          ],
          addNote,
        }}
      >
        <AddNoteDialog genreId="genre1" />
      </NotesContextProvider>,
    );

    // ダイアログ表示
    fireEvent.click(getByTestId('activatorButton'));

    // メモの情報を設定
    fireEvent.change(getByLabelText('タイトル'), {
      target: { value: 'testTitle' },
    });
    fireEvent.change(getByLabelText('メモ'), { target: { value: 'testText' } });
    fireEvent.change(getByLabelText('著者名'), {
      target: { value: 'testAuthorName' },
    });
    fireEvent.change(getByLabelText('書籍名'), {
      target: { value: 'testBookName' },
    });

    // 追加ボタンを押す
    fireEvent.click(getByTestId('doneButton'));

    // メモの追加が呼び出されているか
    expect(addNote.mock.calls.length).toBe(1);
    expect(addNote.mock.calls[0][1].title).toBe('testTitle');
    expect(addNote.mock.calls[0][1].text).toBe('testText');
    expect(addNote.mock.calls[0][1].authorName).toBe('testAuthorName');
    expect(addNote.mock.calls[0][1].bookName).toBe('testBookName');
  });
});
