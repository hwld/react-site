import React, { useState } from 'react';
import { render, fireEvent, dragAndDrop } from '../../../test-util';
import TreeView from './TreeView';
import TreeItem from './TreeItem';

describe('<TreeView>', () => {
  describe('選択関係', () => {
    test('選択状態のアイテムを削除すると、選択状態から除外される', () => {
      const nodeSelect = jest.fn();
      const { rerender } = render(
        <TreeView selectedIds={['item']} onNodeSelect={nodeSelect}>
          <TreeItem label="item" nodeId="item" />
        </TreeView>,
      );

      rerender(<TreeView selectedIds={['item']} onNodeSelect={nodeSelect} />);

      expect(nodeSelect.mock.calls.length).toBe(1);
      expect(nodeSelect.mock.calls[0][0]).toEqual([]);
    });
  });

  describe('Expanded', () => {
    test('デフォルトは展開状態', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label="parent" nodeId="parent">
            <TreeItem label="child" nodeId="child" />
          </TreeItem>
        </TreeView>,
      );

      expect(getByTestId('childrenLayer-parent')).not.toHaveAttribute('hidden');
    });

    test('正常に開閉できる', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem label="parent" nodeId="parent">
            <TreeItem label="child" nodeId="child" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(getByTestId('expandLayer-parent'));
      expect(getByTestId('childrenLayer-parent')).toHaveAttribute('hidden');

      fireEvent.click(getByTestId('expandLayer-parent'));
      expect(getByTestId('childrenLayer-parent')).not.toHaveAttribute('hidden');
    });
  });

  describe('ドラッグアンドドロップ', () => {
    const DropTreeView: React.FC<{
      onDrop: () => void;
      multiple?: boolean;
    }> = ({ onDrop, multiple = false }) => {
      const [selectedIds, setSelectedIds] = useState<string[]>([]);

      return (
        <TreeView
          multiple={multiple}
          isDrag
          onDrop={onDrop}
          onNodeSelect={ids => setSelectedIds(ids)}
          selectedIds={selectedIds}
        >
          <TreeItem label="parent" nodeId="parent">
            <TreeItem label="child" nodeId="child">
              <TreeItem label="grandChild" nodeId="grandChild" />
            </TreeItem>
          </TreeItem>
        </TreeView>
      );
    };

    test('TreeItemは親以上のTreeItemにdropできる.', () => {
      const onDrop = jest.fn();

      const { getByTestId } = render(<DropTreeView onDrop={onDrop} />);

      dragAndDrop(
        getByTestId('dragLayer-grandChild'),
        getByTestId('dropLayer-child'),
      );

      dragAndDrop(
        getByTestId('dragLayer-grandChild'),
        getByTestId('dropLayer-parent'),
      );

      expect(onDrop.mock.calls.length).toBe(2);
      expect(onDrop.mock.calls[0][0]).toEqual('grandChild');
      expect(onDrop.mock.calls[0][1]).toEqual('child');

      expect(onDrop.mock.calls[1][0]).toEqual('grandChild');
      expect(onDrop.mock.calls[1][1]).toEqual('parent');
    });

    test('TreeItemは子以下のTreeItemにdropできない.', () => {
      const onDrop = jest.fn();

      const { getByTestId } = render(<DropTreeView onDrop={onDrop} />);

      dragAndDrop(
        getByTestId('dragLayer-parent'),
        getByTestId('dropLayer-child'),
      );

      dragAndDrop(
        getByTestId('dragLayer-parent'),
        getByTestId('dropLayer-grandChild'),
      );
      expect(onDrop.mock.calls.length).toBe(0);
    });

    test('複数のTreeItemをdropできる', () => {
      const onDrop = jest.fn();

      const { getByTestId } = render(<DropTreeView onDrop={onDrop} multiple />);

      fireEvent.click(getByTestId('clickLayer-child'));
      fireEvent.click(getByTestId('clickLayer-grandChild'), { ctrlKey: true });

      dragAndDrop(
        getByTestId('dragLayer-child'),
        getByTestId('dropLayer-parent'),
      );

      expect(onDrop.mock.calls.length).toBe(2);
      expect(onDrop.mock.calls[0][0]).toEqual('child');
      expect(onDrop.mock.calls[0][1]).toBe('parent');

      expect(onDrop.mock.calls[1][0]).toEqual('grandChild');
      expect(onDrop.mock.calls[1][1]).toBe('parent');
    });
  });
});
