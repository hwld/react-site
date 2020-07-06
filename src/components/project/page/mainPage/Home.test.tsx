import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '../../../../test-util';
import Home from './Home';

describe('<Home>', () => {
  test('メインページが表示されている', () => {
    const { queryByTestId } = render(<Home />);
    expect(queryByTestId('mainPage')).toBeTruthy();
  });

  test('ドロワーが開閉できる', async () => {
    const { queryByTestId, getByTestId } = render(<Home />);

    // 初期状態は開いている状態
    expect(queryByTestId('presistentDrawer')).toBeTruthy();

    fireEvent.click(getByTestId('menuButton'));

    expect(queryByTestId('presistentDrawer')).toBeTruthy();
  });
});
