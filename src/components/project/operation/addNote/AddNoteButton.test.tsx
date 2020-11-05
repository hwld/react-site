import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { AddNoteButton } from './AddNoteButton';
import { NoteField } from '../../../../services/notes';

describe('<AddNoteDialog>', () => {
  test('ノート追加処理が適切に呼び出される', () => {
    const addNote = jest.fn((categoryId: string, noteField: NoteField) => ({
      categoryId,
      noteField,
    }));
    const { getByLabelText, getByTestId } = render(
      <NotesContextProvider
        value={{
          moveNotes: () => {},
          removeNotes: () => {},
          updateNote: () => {},
          notes: [
            {
              title: 'dammy',
              text: 'dammy',
              createdAt: new Date(),
              updatedAt: new Date(),
              id: 'dammy',
              categoryId: 'dammy',
            },
          ],
          addNote,
        }}
      >
        <AddNoteButton categoryId="category1" />
      </NotesContextProvider>,
    );

    // ダイアログ表示
    fireEvent.click(getByTestId('activatorButton'));

    // メモの情報を設定
    fireEvent.change(getByLabelText('タイトル'), {
      target: { value: 'testTitle' },
    });
    fireEvent.change(getByLabelText('メモ'), { target: { value: 'testText' } });

    // 追加ボタンを押す
    fireEvent.click(getByTestId('doneButton'));

    // メモの追加が呼び出されているか
    expect(addNote.mock.calls.length).toBe(1);
    expect(addNote.mock.calls[0][1].title).toBe('testTitle');
    expect(addNote.mock.calls[0][1].text).toBe('testText');
  });
});