import React, { useContext, useEffect } from 'react';
import { ListItem as MuiListItem, Divider } from '@material-ui/core';
import ListContext from './ListContext';

interface ListItemProps {
  itemId: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, itemId }) => {
  const { selectedIds, selectItem, addItemId, removeItemId } = useContext(
    ListContext,
  );

  useEffect(() => {
    addItemId(itemId);

    return () => {
      removeItemId(itemId);
    };
  }, [itemId, addItemId, removeItemId]);

  const select = () => {
    selectItem(itemId);
  };

  return (
    <>
      <MuiListItem
        button
        onClick={select}
        selected={selectedIds.includes(itemId)}
      >
        {children}
      </MuiListItem>
      <Divider />
    </>
  );
};

export default ListItem;
