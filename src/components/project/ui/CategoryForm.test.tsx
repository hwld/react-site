import { fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { CategoryField } from '../../../services/categories';
import { render } from '../../../test-util';
import { CategoryForm, CategoryFormProps } from './CategoryForm';

const renderCategoryForm = (onSubmit: CategoryFormProps['onSubmit']) => {
  const formId = 'categoryForm';
  const utils = render(
    <>
      <CategoryForm id={formId} onSubmit={onSubmit} />
      <button type="submit" form={formId}>
        送信
      </button>
    </>,
  );

  return {
    ...utils,
    categoryNameInput: utils.getByRole('textbox', { name: 'カテゴリー名' }),
    submitButton: utils.getByRole('button', { name: '送信' }),
  };
};

describe('CategoryForm', () => {
  test('入力したカテゴリ名で送信処理が呼び出される', async () => {
    const onSubmit = jest.fn();
    const { categoryNameInput, submitButton } = renderCategoryForm(onSubmit);

    const categoryName = 'categoryName';
    fireEvent.input(categoryNameInput, {
      target: { value: categoryName },
    });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(onSubmit).toBeCalledWith<[CategoryField]>({ categoryName }),
    );
  });

  test('未入力でエラーが表示される', async () => {
    const onSubmit = jest.fn();
    const { submitButton, findByRole } = renderCategoryForm(onSubmit);

    fireEvent.click(submitButton);

    expect(
      (await findByRole('alert', { name: 'カテゴリ名のエラー' })).textContent,
    ).toBe('カテゴリー名は必須項目です');
    expect(onSubmit).not.toBeCalled();
  });

  test('101文字以上の入力でエラーが表示される', async () => {
    const onSubmit = jest.fn();
    const { categoryNameInput, submitButton, findByRole } = renderCategoryForm(
      onSubmit,
    );

    // 最大文字数
    const maxLengthStr = 'a'.repeat(101);
    fireEvent.input(categoryNameInput, { target: { value: maxLengthStr } });
    fireEvent.click(submitButton);

    expect((await findByRole('alert')).textContent).toBe(
      '100文字以内で入力してください',
    );
    expect(onSubmit).not.toBeCalled();
  });
});
