import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { NoteService } from '../../../../services/notes';
import { render } from '../../../../test-util';
import { OpenAddNoteDialogButton } from './OpenAddNoteDialogButton';

const renderToAddNote = (addNote: NoteService['addNote'] = () => {}) => {
  const utils = render(
    <NotesContextProvider value={{ addNote }}>
      <OpenAddNoteDialogButton categoryId="" />
    </NotesContextProvider>,
  );

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
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

describe('メモの追加ダイアログ', () => {
  test('メモを入力するとメモ追加処理が呼ばれる', async () => {
    const addNote = jest.fn();
    const testNote = 'note';
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getNoteInput,
      getAddNoteButton,
    } = renderToAddNote(addNote);

    fireEvent.click(openOperationDialogButton);

    await findOperationDialog();

    fireEvent.input(getNoteInput(), { target: { value: testNote } });
    fireEvent.click(getAddNoteButton());

    await waitFor(() => expect(addNote).toBeCalled());

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
    } = renderToAddNote();

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
