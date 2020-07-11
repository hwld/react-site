import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useCurrentUserId } from './services/auth';
import { render } from './test-util';
import App from './App';

jest.mock('./services/auth', () => {
  const originalModule = jest.requireActual('./services/auth');

  return {
    __esModule: true,
    ...originalModule,
    useCurrentUserId: jest.fn(),
  };
});
const mockedUseCurrentUserId = useCurrentUserId as jest.MockedFunction<
  typeof useCurrentUserId
>;

describe('<App>', () => {
  beforeEach(() => {
    mockedUseCurrentUserId.mockReset();
  });

  test('ユーザー情報を読込中のときに、loadingページが表示される', () => {
    mockedUseCurrentUserId.mockReturnValue({
      userId: '',
      loading: true,
      error: undefined,
    });

    const { queryByTestId } = render(<App />);
    expect(queryByTestId('loadingPage')).not.toBeNull();
  });

  test('未ログインのときに、loginページが表示される', () => {
    mockedUseCurrentUserId.mockReturnValue({
      userId: '',
      loading: false,
      error: undefined,
    });
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('loginPage')).not.toBeNull();
  });

  test('ログイン済みのときに/homeでHomeページが表示される', () => {
    mockedUseCurrentUserId.mockReturnValue({
      userId: 'dammy',
      loading: false,
      error: undefined,
    });
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>,
    );
    expect(queryByTestId('mainPage')).not.toBeNull();
  });

  test('ログイン済みのときに/searchでSearchページが表示される', () => {
    mockedUseCurrentUserId.mockReturnValue({
      userId: 'dammy',
      loading: false,
      error: undefined,
    });
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>,
    );
    expect(queryByTestId('searchPage')).not.toBeNull();
  });
});
