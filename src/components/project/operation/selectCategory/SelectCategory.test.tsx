import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import { render } from '../../../../test-util';
import { SelectCategoryField } from './SelectCategoryField';

const renderToSelectCategory = (
  selectCategoryId: (id: string) => void = () => {},
) => {
  const utils = render(
    <SelectCategoryField
      selectCategoryId={selectCategoryId}
      selectedCategoryId=""
    />,
  );

  return {
    ...utils,
    openOperationDialogField: utils.getByRole('textbox', {
      name: 'カテゴリーの選択',
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
    getSelectCategoryButton: () => {
      return utils.getByRole('button', { name: '選択' });
    },
    getCancelButton: () => {
      return utils.getByRole('button', { name: '中止' });
    },
  };
};

describe('カテゴリーの選択', () => {
  test('選択ボタンを押すとカテゴリ選択処理が呼ばれる', async () => {
    const selectCategory = jest.fn();
    const {
      openOperationDialogField,
      findOperationDialog,
      queryOperationDialog,
      getSelectCategoryButton,
    } = renderToSelectCategory(selectCategory);

    fireEvent.click(openOperationDialogField);
    await findOperationDialog();

    fireEvent.click(getSelectCategoryButton());
    await waitFor(() => expect(selectCategory).toBeCalled());

    await waitForElementToBeRemoved(() => queryOperationDialog());
  });

  // eslint-disable-next-line jest/expect-expect
  test('背景・中止ボタンをクリックするとダイアログが閉じる', async () => {
    const {
      openOperationDialogField,
      findOperationDialog,
      queryOperationDialog,
      getOperationDialogBackdrop,
      getCancelButton,
    } = renderToSelectCategory();

    fireEvent.click(openOperationDialogField);
    await findOperationDialog();

    fireEvent.click(getOperationDialogBackdrop());
    await waitForElementToBeRemoved(() => queryOperationDialog());

    fireEvent.click(openOperationDialogField);
    await findOperationDialog();

    fireEvent.click(getCancelButton());
    await waitForElementToBeRemoved(() => queryOperationDialog());
  });
});
