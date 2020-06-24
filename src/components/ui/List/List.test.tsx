import React from 'react';
import List from './List';
import ListItem from './ListItem';
import { render } from '../../../test-util';

describe('<List>', () => {
  describe('選択関係', () => {
    test('選択状態のアイテムを削除すると、選択状態から除外される', () => {
      const itemSelect = jest.fn();
      const { rerender } = render(
        <List selectedIds={['1']} onSelect={itemSelect}>
          <ListItem itemId="1" />
        </List>,
      );

      rerender(<List selectedIds={['1']} onSelect={itemSelect} />);

      expect(itemSelect.mock.calls.length).toBe(1);
      expect(itemSelect.mock.calls[0][0]).toEqual([]);
    });
  });
});
