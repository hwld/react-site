import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { NoteService } from '../../../../services/notes';
import { render } from '../../../../test-util';
import { AddNoteButton } from './OpenAddNoteDialogButton';

const renderAddNoteButton = (addNote: NoteService['addNote'] = () => {}) => {
  const mock = jest.fn();
  const utils = render(
    <NotesContextProvider
      value={{
        notes: [],
        addNote,
        moveNotes: mock,
        removeNotes: mock,
        updateNote: mock,
      }}
    >
      <AddNoteButton categoryId="" />
    </NotesContextProvider>,
  );

  return {
    ...utils,
    displayDialogButton: utils.getByRole('button', {
      name: 'メモ追加ダイアログを表示',
    }),
    findOperationDialog: () => {
      return utils.findByRole('dialog', { name: 'operationDialog' });
    },
    queryOperationDialog: () => {
      return utils.queryByRole('dialog', { name: 'operationDialog' });
    },
    getOperationDialogBackdrop: () => {
      return utils.getByLabelText('operationDialogBackdrop');
    },
    getNoteInput: () => {
      return utils.getByRole('textbox', { name: 'メモ' });
    },
    getAddNoteButton: () => {
      return utils.getByRole('button', { name: '追加' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('メモの追加', () => {
  test('メモを入力するとメモ追加処理が呼ばれる', async () => {
    const addNote = jest.fn();
    const testNote = 'note';
    const {
      displayDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getNoteInput,
      getAddNoteButton,
    } = renderAddNoteButton(addNote);

    fireEvent.click(displayDialogButton);

    await findOperationDialog();

    fireEvent.input(getNoteInput(), { target: { value: testNote } });
    fireEvent.click(getAddNoteButton());

    await waitFor(() => expect(addNote).toBeCalled());

    await waitForElementToBeRemoved(() => queryOperationDialog());
  });

  // eslint-disable-next-line jest/expect-expect
  test('背景・中止ボタンをクリックするとダイアログが閉じる', async () => {
    const {
      displayDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getOperationDialogBackdrop,
      getCancelButton,
    } = renderAddNoteButton();

    fireEvent.click(displayDialogButton);
    await findOperationDialog();

    fireEvent.click(getOperationDialogBackdrop());
    await waitForElementToBeRemoved(() => queryOperationDialog());

    fireEvent.click(displayDialogButton);
    await findOperationDialog();

    fireEvent.click(getCancelButton());
    await waitForElementToBeRemoved(() => queryOperationDialog());
  });
});
