import React from 'react';
import { logout } from '../../../../services/auth';
import { render, fireEvent } from '../../../../test-util';
import SearchHeader from './SearchHeader';

jest.mock('../../../../services/auth', () => {
  return {
    __esModule: true,
    logout: jest.fn(),
  };
});
const mockedLogout = logout as jest.MockedFunction<typeof logout>;

describe('<SearchHeader>', () => {
  test('ログアウト処理が呼び出される', () => {
    const { getByTestId } = render(<SearchHeader onMenuClick={() => {}} />);
    fireEvent.click(getByTestId('logoutButton'));
    expect(mockedLogout.mock.calls.length).toBe(1);
  });
});
