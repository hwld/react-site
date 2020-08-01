import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from './test-util';
import { AppRouter } from './AppRouter';

describe('<AppRouter>', () => {
  test('ユーザー情報を読込中のときに、loadingページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <AppRouter
          user={{ userId: '', isAnonymous: false }}
          authState={{ loading: true }}
        />
      </MemoryRouter>,
    );
    expect(queryByTestId('loadingPage')).not.toBeNull();
  });

  test('未ログインのときに、loginページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <AppRouter
          user={{ userId: '', isAnonymous: false }}
          authState={{ loading: false }}
        />
      </MemoryRouter>,
    );
    expect(queryByTestId('loginPage')).not.toBeNull();
  });

  test('ログイン済みのときに/homeでHomeページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/home']}>
        <AppRouter
          user={{ userId: 'dammy', isAnonymous: false }}
          authState={{ loading: false }}
        />
      </MemoryRouter>,
    );
    expect(queryByTestId('mainPage')).not.toBeNull();
  });

  test('ログイン済みのときに/searchでSearchページが表示される', () => {
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/search']}>
        <AppRouter
          user={{ userId: 'dammy', isAnonymous: false }}
          authState={{ loading: false }}
        />
      </MemoryRouter>,
    );
    expect(queryByTestId('searchNotestPage')).not.toBeNull();
  });
});
