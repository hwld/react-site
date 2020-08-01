import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test-util';
import { SearchHome } from './SearchHome';

describe('<SearchHome>', () => {
  test('ドロワーを開閉できる', () => {
    const { queryByTestId, getByTestId } = render(<SearchHome />);

    expect(queryByTestId('presistentDrawer')).toHaveAttribute('open');
    fireEvent.click(getByTestId('menuButton'));
    expect(queryByTestId('presistentDrawer')).not.toHaveAttribute('open');
  });
});
