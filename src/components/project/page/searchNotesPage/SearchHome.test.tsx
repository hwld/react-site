import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-util';
import { SearchHome } from './SearchHome';
import { AuthContextProvider } from '../../../../context/AuthContext';

describe('<SearchHome>', () => {
  test('ドロワーを開閉できる', () => {
    const { queryByLabelText, getByRole } = render(
      <AuthContextProvider
        value={{ user: { userId: 'temp', isAnonymous: false } }}
      >
        <SearchHome />
      </AuthContextProvider>,
    );

    expect(queryByLabelText('presistentDrawer')).toHaveAttribute('open');
    fireEvent.click(getByRole('button', { name: 'menuButton' }));
    expect(queryByLabelText('presistentDrawer')).not.toHaveAttribute('open');
  });
});
