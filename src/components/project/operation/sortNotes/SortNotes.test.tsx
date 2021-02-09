import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { render } from '../../../../test-util';
import { OpenSortNotesDialogButton } from './OpenSortNotesDialogButton';

const renderToSortNotes = (sortNotes: () => void = () => {}) => {
  const utils = render(<OpenSortNotesDialogButton sort={sortNotes} />);

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
      name: 'メモ並び替えダイアログを表示',
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
    getSortNotesButton: () => {
      return utils.getByRole('button', { name: '並び替え' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('メモの並び替え', () => {
  test('並び替えボタンを押すとメモ並び替え処理が呼ばれる', async () => {
    const sortNotes = jest.fn();
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getSortNotesButton,
    } = renderToSortNotes(sortNotes);

    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    fireEvent.click(getSortNotesButton());
    await waitFor(() => expect(sortNotes).toBeCalled());

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
    } = renderToSortNotes();

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
