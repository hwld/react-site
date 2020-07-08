import React from 'react';
import { logout } from '../../../../services/auth';
import { render, fireEvent } from '../../../../test-util';
import MainHeader from './MainHeader';

jest.mock('../../../../services/auth', () => {
  return {
    __esModule: true,
    logout: jest.fn(),
  };
});
const mockedLogout = logout as jest.MockedFunction<typeof logout>;

describe('<MainHeader>', () => {
  test('ログアウト処理が呼び出される', () => {
    const { getByTestId } = render(
      <MainHeader onMenuClick={() => {}} onGoSearchMode={() => {}} />,
    );
    fireEvent.click(getByTestId('logoutButton'));
    expect(mockedLogout.mock.calls.length).toBe(1);
  });

  test('propsで渡された処理が呼び出される', () => {
    const menuClick = jest.fn();
    const goSearchMode = jest.fn();
    const { getByTestId } = render(
      <MainHeader onMenuClick={menuClick} onGoSearchMode={goSearchMode} />,
    );

    fireEvent.click(getByTestId('menuButton'));
    fireEvent.click(getByTestId('searchModeButton'));

    expect(menuClick.mock.calls.length).toBe(1);
    expect(goSearchMode.mock.calls.length).toBe(1);
  });
});
