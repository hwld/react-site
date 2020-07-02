import React from 'react';
import { Note } from '../../../services/notes';
import { render, fireEvent } from '../../../test-util';
import NotesContext from '../../../context/NotesContext';
import AddNoteDialog from './AddNoteDialog';

describe('<AddNoteDialog>', () => {
  test('ノート追加処理が適切に呼び出される', () => {
    const addNote = jest.fn((note: Note) => note);
    const others = jest.fn();
    const { getByRole, getByLabelText, getAllByRole } = render(
      <NotesContext.Provider
        value={{
          notes: [
            {
              title: 'dammy',
              text: 'dammy',
              authorName: 'dammy',
              bookName: 'dammy',
              creationDate: new Date(),
              lastUpdated: new Date(),
              id: 'dammy',
              genreId: 'dammy',
            },
          ],
          addNote,
          removeNote: others,
          updateNote: others,
          moveNote: others,
        }}
      >
        <AddNoteDialog genreId="genre1" />
      </NotesContext.Provider>,
    );

    // ダイアログ表示
    const activator = getByRole('button');
    expect(activator).toBeTruthy();
    fireEvent.click(activator);

    // メモの情報を設定
    const titleField = getByLabelText('タイトル');
    const textField = getByLabelText('メモ');
    const authorNameField = getByLabelText('著者名');
    const bookNameField = getByLabelText('書籍名');

    expect(titleField).toBeTruthy();
    expect(textField).toBeTruthy();
    expect(authorNameField).toBeTruthy();
    expect(bookNameField).toBeTruthy();

    fireEvent.change(titleField, { target: { value: 'testTitle' } });
    fireEvent.change(textField, { target: { value: 'testText' } });
    fireEvent.change(authorNameField, { target: { value: 'testAuthorName' } });
    fireEvent.change(bookNameField, { target: { value: 'testBookName' } });

    // 追加ボタンを押す
    const addButton = getAllByRole('button').filter(button =>
      button.textContent?.match(/追加/),
    );
    expect(addButton.length).toBe(1);
    fireEvent.click(addButton[0]);

    // メモの追加が呼び出されているか
    expect(addNote.mock.calls.length).toBe(1);
    expect(addNote.mock.calls[0][0].title).toBe('testTitle');
    expect(addNote.mock.calls[0][0].text).toBe('testText');
    expect(addNote.mock.calls[0][0].authorName).toBe('testAuthorName');
    expect(addNote.mock.calls[0][0].bookName).toBe('testBookName');
  });
});
