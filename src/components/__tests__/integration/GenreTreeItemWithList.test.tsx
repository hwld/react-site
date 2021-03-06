import React, { useState } from 'react';
import { render, dragAndDrop } from '../../../test-util';
import { List } from '../../ui/List/List';
import { CategoryTreeItem } from '../../project/ui/CategoryTree/CategoryTreeItem';
import { ListItem } from '../../ui/List/ListItem';
import { NotesContextProvider } from '../../../context/NotesContext';

describe('<CategoryTreeItem> with <List>', () => {
  const DnDTestList: React.FC<{ onDrop: () => {} }> = ({ onDrop }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <NotesContextProvider>
        <List
          draggable
          selected={selectedIds}
          onSelect={ids => setSelectedIds(ids)}
        >
          <ListItem itemId="listItem" />
        </List>
        <CategoryTreeItem
          nodeId="treeItem"
          categoryName="treeItem"
          onNotesDrop={onDrop}
        />
      </NotesContextProvider>
    );
  };
  test('ListItemがCategoryTreeItemにドロップ可能', () => {
    const onDrop = jest.fn();
    const { getByTestId } = render(<DnDTestList onDrop={onDrop} />);

    dragAndDrop(
      getByTestId('dragLayer-listItem'),
      getByTestId('outer-dropLayer-treeItem'),
    );

    expect(onDrop.mock.calls.length).toBe(1);
    expect(onDrop.mock.calls[0][0]).toEqual(['listItem']);
    expect(onDrop.mock.calls[0][1]).toBe('treeItem');
  });
});
