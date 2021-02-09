import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import { CategoryService } from '../../../../services/categories';
import { render } from '../../../../test-util';
import { OpenUpdateCategoryDialogButton } from './OpenUpdateCategoryDialogButton';

const renderToUpdateCategory = (
  updateCategory: CategoryService['updateCategory'] = () => {},
) => {
  const utils = render(
    <CategoriesContextProvider value={{ updateCategory }}>
      <OpenUpdateCategoryDialogButton defaultCategoryId="testId" />
    </CategoriesContextProvider>,
  );

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
      name: 'カテゴリー編集ダイアログを表示',
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
    getUpdateCategoryButton: () => {
      return utils.getByRole('button', { name: '変更' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('カテゴリーの編集', () => {
  test('カテゴリ名を入力し、変更ボタンを押すとカテゴリー編集処理が呼ばれる', async () => {
    const updateCategory = jest.fn();
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getCategoryNameInput,
      getUpdateCategoryButton,
    } = renderToUpdateCategory(updateCategory);

    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    fireEvent.input(getCategoryNameInput(), {
      target: { value: 'categoryName' },
    });
    fireEvent.click(getUpdateCategoryButton());
    await waitFor(() => expect(updateCategory).toBeCalled());

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
    } = renderToUpdateCategory();

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
