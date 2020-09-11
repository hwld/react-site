import React, { useContext, useEffect, useRef } from 'react';
import {
  ListItem as MuiListItem,
  Divider,
  useForkRef,
} from '@material-ui/core';
import { useDrag, DragPreviewImage } from 'react-dnd';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { ListContext } from './ListContext';
import { ItemTypes } from '../ItemTypes';

const StyledMuiListItem = styled(MuiListItem)`
  &.Mui-focusVisible,
  &:focus {
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
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const ListItem = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ListItemProps>
>(function ListItem({ children, itemId, onKeyDown }, ref) {
  const {
    selectedIds,
    draggable,
    selectItem,
    removeItemId,
    isFocused,
    focus,
    unFocus,
  } = useContext(ListContext);

  const itemRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(itemRef, ref);

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
    if (itemRef.current && isFocused(itemId)) {
      itemRef.current.focus();
    }
  }, [isFocused, itemId]);

  return (
    <div ref={draggable ? drag : null} data-testid={`dragLayer-${itemId}`}>
      <StyledMuiListItem
        ref={handleRef}
        button
        onClick={handleClick}
        onKeyDown={onKeyDown}
        onFocus={(event: React.FocusEvent<HTMLDivElement>) => {
          event.stopPropagation();
          focus(itemId);
        }}
        onBlur={() => {
          unFocus(itemId);
        }}
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
    </div>
  );
});
