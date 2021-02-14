import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { CategoriesContextProvider } from '../../../../context/CategoriesContext';
import { CategoryService } from '../../../../services/categories';
import { render } from '../../../../test-util';
import { OpenRemoveCategoriesDialogButton } from './OpenRemoveCategoriesDialogButton';

const renderToRemoveCategories = (
  removeCategories: CategoryService['removeCategories'] = () => {},
) => {
  const utils = render(
    <CategoriesContextProvider value={{ removeCategories }}>
      <OpenRemoveCategoriesDialogButton targetCategoryIds={[]} />
    </CategoriesContextProvider>,
  );

  return {
    ...utils,
    openOperationDialogButton: utils.getByRole('button', {
      name: 'カテゴリー削除ダイアログを表示',
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
    getRemoveCategoriesButton: () => {
      return utils.getByRole('button', { name: '削除' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('カテゴリーの削除ダイアログ', () => {
  test('削除ボタンを押すとカテゴリー削除処理が呼ばれる', async () => {
    const removeCategories = jest.fn();
    const {
      openOperationDialogButton,
      findOperationDialog,
      queryOperationDialog,
      getRemoveCategoriesButton,
    } = renderToRemoveCategories(removeCategories);

    fireEvent.click(openOperationDialogButton);
    await findOperationDialog();

    fireEvent.click(getRemoveCategoriesButton());
    await waitFor(() => expect(removeCategories).toBeCalled());

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
    } = renderToRemoveCategories();

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
