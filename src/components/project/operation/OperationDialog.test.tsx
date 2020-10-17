import React from 'react';
import { OperationDialog } from './OperationDialog';
import { render, fireEvent } from '../../../test-util';

describe('<OperationDialog>', () => {
  test('ダイアログを完了すると指定した処理が行われる', async () => {
    const onDone = jest.fn();
    const { getByTestId } = render(
      <OperationDialog
        isOpen
        setIsOpen={jest.fn()}
        activator={<></>}
        doneText="完了"
        onDone={onDone}
        title=""
      />,
    );

    fireEvent.click(getByTestId('doneButton'));
    expect(onDone.mock.calls.length).toBe(1);
  });
});
