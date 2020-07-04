import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import Login from './Login';
import { login } from '../../../../services/auth';

jest.mock('../../../../services/auth', () => {
  return {
    __esModule: true,
    login: jest.fn(() => new Promise(resolve => resolve())),
  };
});

describe('<Login>', () => {
  test('ログイン処理が正しく呼び出される', () => {
    const { getByTestId } = render(<Login />);
    fireEvent.click(getByTestId('loginButton'));

    expect((login as jest.MockedFunction<typeof login>).mock.calls.length).toBe(
      1,
    );
  });
});
