import React, { useContext, useEffect, useRef } from 'react';
import { ListItem as MuiListItem, Divider } from '@material-ui/core';
import { useDrag, DragPreviewImage } from 'react-dnd';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { ListContext } from './ListContext';
import { ItemTypes } from '../ItemTypes';

const ListItemRoot = styled.div``;

const StyledMuiListItem = styled(MuiListItem)`
  &.Mui-focusVisible {
    background-color: ${props => props.theme.palette.action.hover};
  }

  &.Mui-selected {
    background-color: ${props =>
      fade(
        props.theme.palette.action.selected,
        props.theme.palette.action.selectedOpacity,
      )};
  }

  &.Mui-selected.Mui-focusVisible,
  &.Mui-selected:focus,
  &.Mui-selected:hover {
    background-color: ${props =>
      fade(
        props.theme.palette.action.selected,
        props.theme.palette.action.selectedOpacity +
          props.theme.palette.action.hoverOpacity,
      )};
  }
`;

export type ListItemDropType = {
  type: string;
  ids: string[];
};

type ListItemProps = {
  itemId: string;
};

const ListItem: React.FC<ListItemProps> = ({ children, itemId }) => {
  const {
    selectedIds,
    draggable,
    selectItem,
    removeItemId,
    isFocused,
    focus,
  } = useContext(ListContext);

  const itemRef = useRef<HTMLDivElement>(null);

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

  const handleClick = () => {
    if (!isFocused(itemId)) {
      focus(itemId);
    }

    if (!selectedIds.includes(itemId)) {
      selectItem([...selectedIds, itemId]);
    } else {
      selectItem(selectedIds.filter(id => id !== itemId));
    }
  };

  useEffect(() => {
    return () => {
      removeItemId(itemId);
    };
  }, [itemId, removeItemId]);

  useEffect(() => {
    const ref = itemRef.current;
    if (ref && isFocused(itemId)) {
      ref.focus();
    }
  }, [isFocused, itemId]);

  return (
    <ListItemRoot
      ref={draggable ? drag : null}
      data-testid={`dragLayer-${itemId}`}
    >
      <StyledMuiListItem
        ref={itemRef}
        button
        onClick={handleClick}
        selected={selectedIds.includes(itemId)}
        data-testid={`selectLayer-${itemId}`}
        tabIndex={-1}
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
