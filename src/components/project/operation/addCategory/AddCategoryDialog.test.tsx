import { fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../../../test-util';
import { AddCategoryDialog } from './AddCategoryDialog';

describe('<AddCategoryDialog>', () => {
  test('isOpen propsによって開閉ができる', async () => {
    const mock = jest.fn();

    // open
    const { rerender } = render(
      <AddCategoryDialog isOpen onClose={mock} onAddCategory={mock} />,
    );
    expect(
      screen.queryByRole('dialog', { name: 'operationDialog' }),
    ).not.toBeNull();

    // close
    rerender(
      <AddCategoryDialog isOpen={false} onClose={mock} onAddCategory={mock} />,
    );
    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'operationDialog' }),
      ).toBeNull(),
    );
  });

  test('意図したテキストが表示される', () => {
    const mock = jest.fn();
    render(<AddCategoryDialog isOpen onClose={mock} onAddCategory={mock} />);

    expect(screen.getByText('カテゴリーの追加')).not.toBeNull();
    expect(screen.getByText('追加')).not.toBeNull();
    expect(screen.getByText('中止')).not.toBeNull();
  });

  test('背景・中止ボタンクリック時にonCloseが呼ばれる', () => {
    const onClose = jest.fn();
    const mock = jest.fn();
    render(<AddCategoryDialog isOpen onClose={onClose} onAddCategory={mock} />);

    fireEvent.click(screen.getByLabelText('operationDialogBackdrop'));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: '中止' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('フォームに入力し、追加ボタンを押すとonAddCategoryが呼ばれる', async () => {
    const onAddCategory = jest.fn();
    const mock = jest.fn();
    render(
      <AddCategoryDialog isOpen onClose={mock} onAddCategory={onAddCategory} />,
    );

    fireEvent.input(screen.getByRole('textbox', { name: 'カテゴリー名' }), {
      target: { value: 'test' },
    });
    fireEvent.click(screen.getByRole('button', { name: '追加' }));

    await waitFor(() => expect(onAddCategory).toBeCalled());
  });
});
