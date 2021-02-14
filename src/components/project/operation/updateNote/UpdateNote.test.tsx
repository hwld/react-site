import React from 'react';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { NoteService } from '../../../../services/notes';
import {
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../../test-util';
import { OpenUpdateNoteDialogButton } from './OpenUpdateNoteDialogButton';

const renderToUpdateNote = (
  updateNote: NoteService['updateNote'] = () => {},
) => {
  const utils = render(
    <NotesContextProvider value={{ updateNote }}>
      <OpenUpdateNoteDialogButton defaultNoteId="testId" />
    </NotesContextProvider>,
  );

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
      name: 'メモ編集ダイアログを表示',
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
    getUpdateNoteButton: () => {
      return utils.getByRole('button', { name: '変更' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('メモの編集ダイアログ', () => {
  test('メモを入力し、変更ボタンを押すとカテゴリー編集処理が呼ばれる', async () => {
    const updateNote = jest.fn();
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getNoteInput,
      getUpdateNoteButton,
    } = renderToUpdateNote(updateNote);

    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    fireEvent.input(getNoteInput(), { target: { value: 'note' } });
    fireEvent.click(getUpdateNoteButton());
    await waitFor(() => expect(updateNote).toBeCalled());

    await waitForElementToBeRemoved(() => queryOperationDialog());
  });

  // eslint-disable-next-line jest/expect-expect
  test('背景・中止ボタンをクリックするとダイアログが閉じる', async () => {
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getOperationDialogBackdrop,
      getCancelButton,
    } = renderToUpdateNote();

    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    fireEvent.click(getOperationDialogBackdrop());
    await waitForElementToBeRemoved(() => queryOperationDialog());

    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    fireEvent.click(getCancelButton());
    await waitForElementToBeRemoved(() => queryOperationDialog());
  });
});
