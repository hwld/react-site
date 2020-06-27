import React from 'react';
import Drawer from './Drawer';
import { render } from '../../../test-util';

describe('<Draer>', () => {
  test('通常のDrawer,PresistentDrawerを切替可能', () => {
    const mock = jest.fn();
    const { queryByTestId, rerender } = render(
      <Drawer onOpen={mock} onClose={mock} open isPresistent={false} />,
    );
    expect(queryByTestId('presistentDrawer')).not.toBeTruthy();

    rerender(<Drawer onOpen={mock} onClose={mock} open isPresistent />);
    expect(queryByTestId('presistentDrawer')).toBeTruthy();
  });
});
