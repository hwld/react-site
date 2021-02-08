import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import { CategoryService } from '../../../../services/categories';
import { render } from '../../../../test-util';
import { OpenAddCategoryDialogButton } from './OpenAddCategoryDialogButton';

const renderToAddCategory = (
  addCategory: CategoryService['addCategory'] = () => {},
) => {
  const utils = render(
    <CategoriesContextProvider value={{ addCategory }}>
      <OpenAddCategoryDialogButton parentCategoryId="" />
    </CategoriesContextProvider>,
  );

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
      name: 'カテゴリー追加ダイアログを表示',
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
    getCategoryNameInput: () => {
      return utils.getByRole('textbox', { name: 'カテゴリー名' });
    },
    getAddCategoryButton: () => {
      return utils.getByRole('button', { name: '追加' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('カテゴリーの追加', () => {
  test('カテゴリ名を入力するとカテゴリー追加処理が呼ばれる', async () => {
    const addCategory = jest.fn();
    const testCategoryName = 'categoryName';
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getCategoryNameInput,
      getAddCategoryButton,
    } = renderToAddCategory(addCategory);

    fireEvent.click(openOperationDialogButton);

    // ダイアログが表示される
    await findOperationDialog();

    fireEvent.input(getCategoryNameInput(), {
      target: { value: testCategoryName },
    });
    fireEvent.click(getAddCategoryButton());

    // addCategoryが呼ばれる
    await waitFor(() => expect(addCategory).toBeCalled());

    // ダイアログが非表示になる
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
    } = renderToAddCategory();

    // ダイアログが表示される
    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    // ダイアログが非表示になる
    fireEvent.click(getOperationDialogBackdrop());
    await waitForElementToBeRemoved(() => queryOperationDialog());

    // ダイアログが表示される
    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    // ダイアログが非表示になる
    fireEvent.click(getCancelButton());
    await waitForElementToBeRemoved(() => queryOperationDialog());
  });
});
