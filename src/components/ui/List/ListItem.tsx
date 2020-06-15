import React, { useContext, useEffect } from 'react';
import { ListItem as MuiListItem, Divider } from '@material-ui/core';
import { useDrag, DragPreviewImage } from 'react-dnd';
import ListContext from './ListContext';
import { ItemTypes } from '../ItemTypes';

interface ListItemProps {
  itemId: string;
}

export type ListItemDropType = {
  type: string;
  ids: string[];
};

const ListItem: React.FC<ListItemProps> = ({ children, itemId }) => {
  const {
    selectedIds,
    isDrag,
    selectItem,
    addItemId,
    removeItemId,
  } = useContext(ListContext);

  useEffect(() => {
    addItemId(itemId);

    return () => {
      removeItemId(itemId);
    };
  }, [itemId, addItemId, removeItemId]);

  const [, drag, preview] = useDrag({
    item: { type: ItemTypes.ListItem, ids: [...selectedIds] },
    begin: () => {
      if (!selectedIds.includes(itemId)) {
        selectItem([itemId]);

        return { type: ItemTypes.ListItem, ids: [itemId] };
      }
    },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        selectItem([]);
      }
    },
  });

  const setSelectedIds = () => {
    if (!selectedIds.includes(itemId)) {
      selectItem([...selectedIds, itemId]);
    } else {
      selectItem(selectedIds.filter(id => id !== itemId));
    }
  };

  return (
    <div ref={isDrag ? drag : null}>
      <MuiListItem
        button
        onClick={setSelectedIds}
        selected={selectedIds.includes(itemId)}
      >
        {children}
      </MuiListItem>
      <Divider />
      <DragPreviewImage
        connect={preview}
        src={`${process.env.PUBLIC_URL}/note.svg`}
      />
    </div>
  );
};

export default ListItem;
