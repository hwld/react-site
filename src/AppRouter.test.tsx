import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from './test-util';
import AppRouter from './AppRouter';

describe('<AppRouter>', () => {
  test('ユーザー情報を読込中のときに、loadingページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <AppRouter userLoading userId="" />
      </MemoryRouter>,
    );
    expect(queryByTestId('loadingPage')).not.toBeNull();
  });

  test('未ログインのときに、loginページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <AppRouter userLoading={false} userId="" />
      </MemoryRouter>,
    );
    expect(queryByTestId('loginPage')).not.toBeNull();
  });

  test('ログイン済みのときに/homeでHomeページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/home']}>
        <AppRouter userLoading={false} userId="dammy" />
      </MemoryRouter>,
    );
    expect(queryByTestId('mainPage')).not.toBeNull();
  });

  test('ログイン済みのときに/searchでSearchページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/search']}>
        <AppRouter userLoading={false} userId="dammy" />
      </MemoryRouter>,
    );
    expect(queryByTestId('searchNotestPage')).not.toBeNull();
  });
});
