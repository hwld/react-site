import React, { useContext, useEffect } from 'react';
import { ListItem as MuiListItem, Divider } from '@material-ui/core';
import { useDrag, DragPreviewImage } from 'react-dnd';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { ListContext } from './ListContext';
import { ItemTypes } from '../ItemTypes';

const ListItemRoot = styled.div``;

const StyledMuiListItem = styled(MuiListItem)`
  &.Mui-focusVisible {
    background-color: transparent;
  }

  &.Mui-selected {
    background-color: ${props =>
      fade(
        props.theme.palette.action.selected,
        props.theme.palette.action.selectedOpacity,
      )};
  }

  &.Mui-selected.Mui-focusVisible,
  &.Mui-selected:hover {
    background-color: ${props =>
      fade(
        props.theme.palette.action.selected,
        props.theme.palette.action.selectedOpacity +
          props.theme.palette.action.hoverOpacity,
      )};
  }
`;

// MuiListItemのselectedを使うとfocusと同じレイヤーにselectedがあたって、focusされたときに色が完全に変わってしまう
const SelectLayer = styled.div<{ selected: boolean }>`
  background-color: ${props =>
    props.selected ? props.theme.palette.action.selected : 'transparent'};
  width: 100%;
  height: 100%;
`;

export type ListItemDropType = {
  type: string;
  ids: string[];
};

type ListItemProps = {
  itemId: string;
};

const ListItem: React.FC<ListItemProps> = ({ children, itemId }) => {
  const { selectedIds, draggable, selectItem, removeItemId } = useContext(
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
    <ListItemRoot
      ref={draggable ? drag : null}
      data-testid={`dragLayer-${itemId}`}
    >
      <StyledMuiListItem
        button
        onClick={setSelectedIds}
        selected={selectedIds.includes(itemId)}
        data-testid={`selectLayer-${itemId}`}
      >
        {children}
      </StyledMuiListItem>
      <Divider />
      <DragPreviewImage
        connect={preview}
        src={`${process.env.PUBLIC_URL}/note.svg`}
      />
    </ListItemRoot>
  );
};

export { ListItem };
