import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { fireEvent } from '@testing-library/react';
import List from './List';
import ListItem, { ListItemDropType } from './ListItem';
import { render, dragAndDrop } from '../../../test-util';
import { ItemTypes } from '../ItemTypes';

describe('<List>', () => {
  describe('選択関係', () => {
    test('選択状態のアイテムを削除すると、選択状態から除外される', () => {
      const itemSelect = jest.fn();
      const { rerender } = render(
        <List selectedIds={['item']} onSelect={itemSelect}>
          <ListItem itemId="item" />
        </List>,
      );

      rerender(<List selectedIds={['item']} onSelect={itemSelect} />);

      expect(itemSelect.mock.calls.length).toBe(1);
      expect(itemSelect.mock.calls[0][0]).toEqual([]);
    });
  });

  describe('ドラッグ', () => {
    const DnDTestList: React.FC<{ onDrop: (ids: string[]) => void }> = ({
      onDrop,
    }) => {
      const [selectedIds, setSelectedIds] = useState<string[]>([]);

      const [, drop] = useDrop({
        accept: ItemTypes.ListItem,
        drop: (item: ListItemDropType) => {
          onDrop(item.ids);
        },
      });

      return (
        <>
          <List
            isDrag
            selectedIds={selectedIds}
            onSelect={ids => setSelectedIds(ids)}
          >
            <ListItem itemId="item1" />
            <ListItem itemId="item2" />
            <ListItem itemId="item3" />
          </List>
          <div ref={drop} data-testid="dropLayer">
            DropTarget
          </div>
        </>
      );
    };

    test('単一アイテムをドラッグ可能', () => {
      const onDrop = jest.fn();
      const { getByTestId } = render(<DnDTestList onDrop={onDrop} />);

      dragAndDrop(getByTestId('dragLayer-item1'), getByTestId('dropLayer'));

      expect(onDrop.mock.calls.length).toBe(1);
      expect(onDrop.mock.calls[0][0]).toEqual(['item1']);
    });

    test('複数アイテムをドラッグ可能', () => {
      const onDrop = jest.fn();
      const { getByTestId } = render(<DnDTestList onDrop={onDrop} />);

      fireEvent.click(getByTestId('selectLayer-item1'));
      fireEvent.click(getByTestId('selectLayer-item2'));
      fireEvent.click(getByTestId('selectLayer-item3'));

      dragAndDrop(getByTestId('dragLayer-item1'), getByTestId('dropLayer'));

      expect(onDrop.mock.calls.length).toBe(1);
      expect(onDrop.mock.calls[0][0]).toEqual(['item1', 'item2', 'item3']);
    });
  });
});
