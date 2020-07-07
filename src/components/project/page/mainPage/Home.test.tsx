import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import Home from './Home';

describe('<Home>', () => {
  test('メインページが表示されている', () => {
    const { queryByTestId } = render(<Home />);
    expect(queryByTestId('mainPage')).toBeTruthy();
  });

  test('ドロワーが開閉できる', async () => {
    const { queryByTestId, getByTestId } = render(<Home />);

    expect(queryByTestId('presistentDrawer')).toHaveAttribute('open');
    fireEvent.click(getByTestId('menuButton'));
    expect(queryByTestId('presistentDrawer')).not.toHaveAttribute('open');
  });
});
