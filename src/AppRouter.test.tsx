import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from './test-util';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';

describe('<AppRouter>', () => {
  test('ユーザー情報を読込中のときに、loadingページが表示される', () => {
    const { queryByTestId } = render(
      <AuthContextProvider
        value={{
          user: { userId: '', isAnonymous: false },
          authState: { loading: true },
          anonymousLogin: () => Promise.resolve(),
          deleteAccount: () => Promise.resolve(),
          googleLogin: () => Promise.resolve(),
          linkWithGoogle: () => Promise.resolve(),
          logout: () => Promise.resolve(),
        }}
      >
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(queryByTestId('loadingPage')).not.toBeNull();
  });

  test('未ログインのときに、loginページが表示される', () => {
    const { queryByTestId } = render(
      <AuthContextProvider
        value={{
          user: { userId: '', isAnonymous: false },
          authState: { loading: false },
          anonymousLogin: () => Promise.resolve(),
          deleteAccount: () => Promise.resolve(),
          googleLogin: () => Promise.resolve(),
          linkWithGoogle: () => Promise.resolve(),
          logout: () => Promise.resolve(),
        }}
      >
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(queryByTestId('loginPage')).not.toBeNull();
  });

  test('ログイン済みのときに/homeでHomeページが表示される', () => {
    const { queryByTestId } = render(
      <AuthContextProvider
        value={{
          user: { userId: 'dammy', isAnonymous: false },
          authState: { loading: false },
          anonymousLogin: () => Promise.resolve(),
          deleteAccount: () => Promise.resolve(),
          googleLogin: () => Promise.resolve(),
          linkWithGoogle: () => Promise.resolve(),
          logout: () => Promise.resolve(),
        }}
      >
        <MemoryRouter initialEntries={['/home']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(queryByTestId('mainPage')).not.toBeNull();
  });

  test('ログイン済みのときに/searchでSearchページが表示される', () => {
    const { queryByTestId } = render(
      <AuthContextProvider
        value={{
          user: { userId: 'dammy', isAnonymous: false },
          authState: { loading: false },
          anonymousLogin: () => Promise.resolve(),
          deleteAccount: () => Promise.resolve(),
          googleLogin: () => Promise.resolve(),
          linkWithGoogle: () => Promise.resolve(),
          logout: () => Promise.resolve(),
        }}
      >
        <MemoryRouter initialEntries={['/search']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(queryByTestId('searchNotestPage')).not.toBeNull();
  });
});
