import React, { useContext, useEffect } from 'react';
import { ListItem as MuiListItem, Divider } from '@material-ui/core';
import styled from 'styled-components';
import { useDrag, DragPreviewImage } from 'react-dnd';
import ListContext from './ListContext';
import { ItemTypes } from '../ItemTypesc';

interface ListItemProps {
  itemId: string;
}

const DragLayer = styled.div``;

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

  const [_, drag, preview] = useDrag({
    item: { type: ItemTypes.ListItem, ids: [...selectedIds] },
    begin: () => {
      if (!selectedIds.includes(itemId)) {
        selectItem([itemId]);
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
    <DragLayer ref={isDrag ? drag : null}>
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
    </DragLayer>
  );
};

export default ListItem;
