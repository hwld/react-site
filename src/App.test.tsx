import React from 'react';
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
});
