import React from 'react';
import OperationDialog from './OperationDialog';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '../../../test-util';

describe('<OperationDialog>', () => {
  test('ダイアログを開閉することができる', async () => {
    const TestDialogContent = 'TestDialogContent';
    const { queryByText, getAllByRole } = render(
      <OperationDialog
        activatorIcon={<>testActivator</>}
        tooltipText="testToolTip"
      >
        {TestDialogContent}
      </OperationDialog>,
    );

    // ダイアログを開くボタン
    expect(queryByText(TestDialogContent)).toBe(null);
    const Activator = getAllByRole('button').filter(element =>
      element.textContent?.match(/testActivator/),
    );
    expect(Activator.length).toBe(1);
    fireEvent.click(Activator[0]);
    expect(queryByText(TestDialogContent)).not.toBe(null);

    // ダイアログを閉じる
    const Cancel = getAllByRole('button').filter(element =>
      element.textContent?.match(/中止/),
    );
    expect(Cancel.length).toBe(1);
    fireEvent.click(Cancel[0]);
    await waitForElementToBeRemoved(() => queryByText(TestDialogContent));
    expect(queryByText(TestDialogContent)).toBe(null);
  });

  test('アクティベータを無効にできる', () => {
    const TestDialogContent = 'TestDialogContent';
    const { queryByText, getAllByRole } = render(
      <OperationDialog
        activatorIcon={<>testActivator</>}
        tooltipText="testToolTip"
        activatorDisabled
      >
        {TestDialogContent}
      </OperationDialog>,
    );

    expect(queryByText(TestDialogContent)).toBe(null);
    const Activator = getAllByRole('button').filter(element =>
      element.textContent?.match(/testActivator/),
    );
    expect(Activator[0]).toBeTruthy();
    fireEvent.click(Activator[0]);
    expect(queryByText(TestDialogContent)).toBe(null);
  });

  test('ダイアログを完了すると指定した処理が行われる', async () => {
    const TestDialogContent = 'TestDialogContent';
    const onDone = jest.fn();
    const { getAllByRole, queryByText } = render(
      <OperationDialog
        activatorIcon={<>testActivator</>}
        doneText="完了"
        onDone={onDone}
        tooltipText="testToolTip"
      >
        {TestDialogContent}
      </OperationDialog>,
    );

    const Activator = getAllByRole('button').filter(element =>
      element.textContent?.match(/testActivator/),
    );
    expect(Activator.length).toBe(1);
    fireEvent.click(Activator[0]);
    expect(queryByText(TestDialogContent)).not.toBe(null);

    const DoneButton = getAllByRole('button').filter(element =>
      element.textContent?.match(/完了/),
    );
    expect(DoneButton.length).toBe(1);
    fireEvent.click(DoneButton[0]);
    expect(onDone.mock.calls.length).toBe(1);

    // ダイアログが閉じるのを待機する
    await waitForElementToBeRemoved(() => queryByText(TestDialogContent));

    expect(queryByText(TestDialogContent)).toBe(null);
  });
});
