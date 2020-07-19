import React, { useContext, useEffect } from 'react';
import { ListItem as MuiListItem, Divider } from '@material-ui/core';
import { useDrag, DragPreviewImage } from 'react-dnd';
import ListContext from './ListContext';
import { ItemTypes } from '../ItemTypes';

export type ListItemDropType = {
  type: string;
  ids: string[];
};

type ListItemProps = {
  itemId: string;
};

const ListItem: React.FC<ListItemProps> = ({ children, itemId }) => {
  const { selectedIds, isDrag, selectItem, removeItemId } = useContext(
    ListContext,
  );

  useEffect(() => {
    return () => {
      removeItemId(itemId);
    };
  }, [itemId, removeItemId]);

  const [, drag, preview] = useDrag({
    item: { type: ItemTypes.ListItem, ids: [...selectedIds] },
    begin: monitor => {
      if (!selectedIds.includes(itemId)) {
        selectItem([itemId]);

        return { type: ItemTypes.ListItem, ids: [itemId] };
      }

      return monitor.getItem();
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
    <div ref={isDrag ? drag : null} data-testid={`dragLayer-${itemId}`}>
      <MuiListItem
        button
        onClick={setSelectedIds}
        selected={selectedIds.includes(itemId)}
        data-testid={`selectLayer-${itemId}`}
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
