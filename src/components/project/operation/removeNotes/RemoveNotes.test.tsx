import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { NoteService } from '../../../../services/notes';
import { render } from '../../../../test-util';
import { OpenRemoveNotesDialogButton } from './OpenRemoveNotesDialogButton';

const renderToRemoveNotes = (
  removeNotes: NoteService['removeNotes'] = () => {},
) => {
  const utils = render(
    <NotesContextProvider value={{ removeNotes }}>
      <OpenRemoveNotesDialogButton targetNoteIds={[]} />
    </NotesContextProvider>,
  );

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
      name: 'メモ削除ダイアログを表示',
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
    getRemoveNotesButton: () => {
      return utils.getByRole('button', { name: '削除' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('メモの削除ダイアログ', () => {
  test('削除ボタンを押すとメモ削除処理が呼ばれる', async () => {
    const removeNotes = jest.fn();
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getRemoveNotesButton,
    } = renderToRemoveNotes(removeNotes);

    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    fireEvent.click(getRemoveNotesButton());
    await waitFor(() => expect(removeNotes).toBeCalled());

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
    } = renderToRemoveNotes();

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
