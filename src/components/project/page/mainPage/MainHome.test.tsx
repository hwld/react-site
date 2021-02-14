import React from 'react';
import { AuthContextProvider } from '../../../../context/AuthContext';
import { render, fireEvent } from '../../../../test-util';
import { MainHome } from './MainHome';

describe('<MainHome>', () => {
  test('ドロワーを開閉できる', () => {
    const { queryByLabelText, getByRole } = render(
      <AuthContextProvider
        value={{ user: { userId: 'temp', isAnonymous: false } }}
      >
        <MainHome />
      </AuthContextProvider>,
    );

    expect(queryByLabelText('presistentDrawer')).toHaveAttribute('open');
    fireEvent.click(getByRole('button', { name: 'menuButton' }));
    expect(queryByLabelText('presistentDrawer')).not.toHaveAttribute('open');
  });
});
