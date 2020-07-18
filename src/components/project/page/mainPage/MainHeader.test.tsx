import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import MainHeader from './MainHeader';

describe('<MainHeader>', () => {
  test('propsで渡された処理が呼び出される', () => {
    const menuClick = jest.fn();
    const goSearchMode = jest.fn();
    const logout = jest.fn();
    const { getByTestId } = render(
      <MainHeader
        onMenuClick={menuClick}
        onGoSearchMode={goSearchMode}
        onLogout={logout}
      />,
    );

    fireEvent.click(getByTestId('menuButton'));
    fireEvent.click(getByTestId('searchModeButton'));
    fireEvent.click(getByTestId('logoutButton'));

    expect(menuClick.mock.calls.length).toBe(1);
    expect(goSearchMode.mock.calls.length).toBe(1);
    expect(logout.mock.calls.length).toBe(1);
  });
});
