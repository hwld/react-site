import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import SearchHeader from './SearchHeader';

describe('<SearchHeader>', () => {
  test('ログアウト処理が呼び出される', () => {
    const logout = jest.fn();
    const { getByTestId } = render(
      <SearchHeader onMenuClick={() => {}} onLogout={logout} />,
    );
    fireEvent.click(getByTestId('logoutButton'));
    expect(logout.mock.calls.length).toBe(1);
  });
});
