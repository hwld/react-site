import React, { useContext, useEffect } from 'react';
import { ListItem as MuiListItem, Divider } from '@material-ui/core';
import ListContext from './ListContext';

interface ListItemProps {
  itemId: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, itemId }) => {
  const { selectedIds, selectItem, setItemId, unsetItemId } = useContext(
    ListContext,
  );

  useEffect(() => {
    if (setItemId) setItemId(itemId);

    return () => {
      if (unsetItemId) unsetItemId(itemId);
    };
  }, [itemId, setItemId, unsetItemId]);

  const select = () => {
    if (selectItem) selectItem(itemId);
  };

  return (
    <>
      <MuiListItem
        button
        onClick={select}
        selected={selectedIds?.includes(itemId)}
      >
        {children}
      </MuiListItem>
      <Divider />
    </>
  );
};

export default ListItem;
