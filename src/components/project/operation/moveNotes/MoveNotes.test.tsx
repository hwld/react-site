import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import { NotesContextProvider } from '../../../../context/NotesContext';
import { NoteService } from '../../../../services/notes';
import { render } from '../../../../test-util';
import { OpenMoveNotesDialogButton } from './OpenMoveNotesDialogButton';

const renderToMoveNotes = (moveNotes: NoteService['moveNotes'] = () => {}) => {
  const testCategoryName = 'testCategoryName';
  const utils = render(
    <CategoriesContextProvider
      value={{
        categories: [
          {
            id: 'testId',
            categoryName: testCategoryName,
            notesSortOrder: { order: 'asc', targetField: 'text' },
            childrenCategoryIds: [],
            createdAt: new Date(),
            parentCategoryId: '',
          },
        ],
      }}
    >
      <NotesContextProvider value={{ moveNotes }}>
        <OpenMoveNotesDialogButton sourceNoteIds={[]} />
      </NotesContextProvider>
    </CategoriesContextProvider>,
  );

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
      name: 'メモ移動ダイアログを表示',
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
    getTestCategoryItem: () => {
      return utils.getByText(testCategoryName);
    },
    getMoveNotesButton: () => {
      return utils.getByRole('button', { name: '移動' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('メモの移動ダイアログ', () => {
  test('移動ボタンでメモ移動処理が呼ばれる', async () => {
    const moveNotes = jest.fn();
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getTestCategoryItem,
      getMoveNotesButton,
    } = renderToMoveNotes(moveNotes);

    fireEvent.click(openOperationDialogButton);

    await findOperationDialog();

    fireEvent.click(getTestCategoryItem());
    fireEvent.click(getMoveNotesButton());

    await waitFor(() => expect(moveNotes).toBeCalled());

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
    } = renderToMoveNotes();

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
