import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from './test-util';
import { AppRouter } from './AppRouter';
import { AuthContextProvider } from './context/AuthContext';

describe('<AppRouter>', () => {
  test('ログイン済みのときに/homeでHomeページが表示される', () => {
    const { queryByLabelText } = render(
      <AuthContextProvider
        value={{
          user: { userId: 'dammy', isAnonymous: false },
          authState: { loading: false },
        }}
      >
        <MemoryRouter initialEntries={['/home']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(queryByLabelText('mainPage')).not.toBeNull();
  });

  test('ログイン済みのときに/searchでSearchページが表示される', () => {
    const { queryByLabelText } = render(
      <AuthContextProvider
        value={{
          user: { userId: 'dammy', isAnonymous: false },
          authState: { loading: false },
        }}
      >
        <MemoryRouter initialEntries={['/search']}>
          <AppRouter />
        </MemoryRouter>
      </AuthContextProvider>,
    );
    expect(queryByLabelText('searchNotesPage')).not.toBeNull();
  });
});
