import React from 'react';
import { Drawer } from './Drawer';
import { render } from '../../../test-util';

describe('<Drawer>', () => {
  test('通常のDrawer,PresistentDrawerを切替可能', () => {
    const mock = jest.fn();
    const { queryByLabelText, rerender } = render(
      <Drawer onOpen={mock} onClose={mock} open isPresistent={false} />,
    );
    expect(queryByLabelText('normalDrawer')).toBeTruthy();

    rerender(<Drawer onOpen={mock} onClose={mock} open isPresistent />);
    expect(queryByLabelText('presistentDrawer')).toBeTruthy();
  });
});
