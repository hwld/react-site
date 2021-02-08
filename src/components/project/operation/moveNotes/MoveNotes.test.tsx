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

const renderOpenDialogButton = (
  moveNotes: NoteService['moveNotes'] = () => {},
) => {
  const mock = jest.fn();
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
        addCategory: mock,
        moveCategories: mock,
        removeCategories: mock,
        updateCategory: mock,
        updateNotesSortOrderInCategory: mock,
      }}
    >
      <NotesContextProvider
        value={{
          notes: [],
          addNote: mock,
          moveNotes,
          removeNotes: mock,
          updateNote: mock,
        }}
      >
        <OpenMoveNotesDialogButton sourceNoteIds={[]} />
      </NotesContextProvider>
    </CategoriesContextProvider>,
  );

  return {
    ...utils,
    displayDialogButton: utils.getByRole('button', {
      name: 'メモ移動ダイアログを表示',
    }),
    findOperationDialog: () => {
      return utils.findByRole('dialog', { name: 'operationDialog' });
    },
    queryOperationDialog: () => {
      return utils.queryByRole('dialog', { name: 'operationDialog' });
    },
    getTestCategoryItem: () => {
      return utils.getByText(testCategoryName);
    },
  };
};

describe('メモの移動', () => {
  test('移動ボタンでメモ移動処理が呼ばれる', async () => {
    const moveNotes = jest.fn();
    const {
      getByRole,
      displayDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getTestCategoryItem,
    } = renderOpenDialogButton(moveNotes);

    fireEvent.click(displayDialogButton);

    await findOperationDialog();

    fireEvent.click(getTestCategoryItem());
    fireEvent.click(getByRole('button', { name: '移動' }));

    await waitFor(() => expect(moveNotes).toBeCalled());

    await waitForElementToBeRemoved(() => queryOperationDialog());
  });

  // eslint-disable-next-line jest/expect-expect
  test('背景・中止ボタンをクリックするとダイアログが閉じる', async () => {
    const {
      getByRole,
      getByLabelText,
      displayDialogButton,
      findOperationDialog,
      queryOperationDialog,
    } = renderOpenDialogButton();

    fireEvent.click(displayDialogButton);
    await findOperationDialog();

    fireEvent.click(getByLabelText('operationDialogBackdrop'));
    await waitForElementToBeRemoved(() => queryOperationDialog());

    fireEvent.click(displayDialogButton);
    await findOperationDialog();

    fireEvent.click(getByRole('button', { name: '中止' }));
    await waitForElementToBeRemoved(() => queryOperationDialog());
  });
});
