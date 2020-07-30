import React from 'react';
import { OperationDialog } from './OperationDialog';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '../../../test-util';

describe('<OperationDialog>', () => {
  test('ダイアログを開閉することができる', async () => {
    const { getByTestId, queryByTestId } = render(
      <OperationDialog activatorIcon={<></>} tooltipText="testToolTip" />,
    );

    expect(queryByTestId('dialog')).toBe(null);

    // ダイアログを開くボタン
    fireEvent.click(getByTestId('activatorButton'));
    expect(queryByTestId('dialog')).not.toBe(null);

    // ダイアログを閉じる
    fireEvent.click(getByTestId('cancelButton'));

    // ダイアログが閉じるのを待機
    await waitForElementToBeRemoved(() => queryByTestId('dialog'));
    expect(queryByTestId('dialog')).toBe(null);
  });

  test('アクティベータを無効にできる', () => {
    const { getByTestId, queryByTestId } = render(
      <OperationDialog
        activatorIcon={<></>}
        tooltipText="testToolTip"
        activatorDisabled
      />,
    );

    expect(queryByTestId('dialog')).toBe(null);

    fireEvent.click(getByTestId('activatorButton'));
    expect(queryByTestId('dialog')).toBe(null);
  });

  test('ダイアログを完了すると指定した処理が行われる', async () => {
    const onDone = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <OperationDialog
        activatorIcon={<></>}
        doneText="完了"
        onDone={onDone}
        tooltipText="testToolTip"
      />,
    );

    fireEvent.click(getByTestId('activatorButton'));
    expect(queryByTestId('dialog')).not.toBe(null);

    fireEvent.click(getByTestId('doneButton'));
    expect(onDone.mock.calls.length).toBe(1);

    // ダイアログが閉じるのを待機する
    await waitForElementToBeRemoved(() => queryByTestId('dialog'));

    expect(queryByTestId('dialog')).toBe(null);
  });
});
