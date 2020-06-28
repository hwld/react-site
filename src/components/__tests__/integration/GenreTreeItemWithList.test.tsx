import React, { useState } from 'react';
import { render, dragAndDrop } from '../../../test-util';
import List from '../../ui/List/List';
import GenreTreeItem from '../../project/ui/GenreTreeItem';
import ListItem from '../../ui/List/ListItem';
import NotesContext from '../../../context/NotesContext';

describe('<GenreTreeItem> with <List>', () => {
  const DnDTestList: React.FC<{ onDrop: () => {} }> = ({ onDrop }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <NotesContext.Provider
        value={{
          moveNote: onDrop,
          notes: [],
          addNote: () => {},
          removeNote: () => {},
          updateNote: () => {},
        }}
      >
        <List
          isDrag
          selectedIds={selectedIds}
          onSelect={ids => setSelectedIds(ids)}
        >
          <ListItem itemId="listItem" />
        </List>
        <GenreTreeItem nodeId="treeItem" genreName="treeItem" />
      </NotesContext.Provider>
    );
  };
  test('ListItemがGenreTreeItemにドロップ可能', () => {
    const onDrop = jest.fn();
    const { getByTestId } = render(<DnDTestList onDrop={onDrop} />);

    dragAndDrop(
      getByTestId('dragLayer-listItem'),
      getByTestId('gti-dropLayer-treeItem'),
    );

    expect(onDrop.mock.calls.length).toBe(1);
    expect(onDrop.mock.calls[0][0]).toBe('listItem');
    expect(onDrop.mock.calls[0][1]).toBe('treeItem');
  });
});
