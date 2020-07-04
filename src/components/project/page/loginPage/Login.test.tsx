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
const mockedLogin = login as jest.MockedFunction<typeof login>;

describe('<Login>', () => {
  test('ログイン処理が正しく呼び出される', () => {
    const { getByTestId } = render(<Login />);
    fireEvent.click(getByTestId('loginButton'));

    expect(mockedLogin.mock.calls.length).toBe(1);
  });
});
