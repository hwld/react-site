import React from 'react';
import { render, fireEvent } from '../../../../test-util';
import MainHome from './MainHome';

describe('<MainHome>', () => {
  test('メインページが表示されている', () => {
    const { queryByTestId } = render(<MainHome />);
    expect(queryByTestId('mainPage')).toBeTruthy();
  });

  test('ドロワーを開閉できる', () => {
    const { queryByTestId, getByTestId } = render(<MainHome />);

    expect(queryByTestId('presistentDrawer')).toHaveAttribute('open');
    fireEvent.click(getByTestId('menuButton'));
    expect(queryByTestId('presistentDrawer')).not.toHaveAttribute('open');
  });
});
