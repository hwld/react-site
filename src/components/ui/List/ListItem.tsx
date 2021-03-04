import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ListItem as MuiListItem, useForkRef } from '@material-ui/core';
import { useDrag, DragPreviewImage } from 'react-dnd';
import styled from 'styled-components';
import { fade } from '@material-ui/core/styles';
import { ListContext } from './ListContext';
import { ItemTypes } from '../ItemTypes';

export type ListItemDropType = {
  type: string;
  ids: string[];
};

export type ListItemProps = {
  className?: string;
  itemId: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const Component = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<ListItemProps>
>(function ListItem({ children, className, itemId, onKeyDown }, ref) {
  const {
    focusedId,
    lastFocusedId,
    selectedIds,
    draggable,
    selectItem,
    removeItemId,
    isFocused,
    isLastFocused,
    focus,
    unFocus,
  } = useContext(ListContext);

  const itemRef = useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(itemRef, ref);

  const focused = isFocused(itemId);
  const lastFocused = isLastFocused(itemId);

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

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();

      if (!isFocused(itemId)) {
        focus(itemId);
      }

      if (!selectedIds.includes(itemId)) {
        selectItem([...selectedIds, itemId]);
      } else {
        selectItem(selectedIds.filter(id => id !== itemId));
      }
    },
    [focus, isFocused, itemId, selectItem, selectedIds],
  );

  // コンポーネントの破棄時にだけremoveItemIdが呼ばれることを期待する。
  // removeItemIdがそれ以外のタイミングで変更されると想定していない動作になる。
  // itemIdも同様で、使用する側でitemIdを動的に変更しないように気をつける。
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

  const tabIndex = useMemo(() => {
    // いずれかのitemのfocusが当たっていたらすべて-1
    if (focusedId) {
      return -1;
    }

    // 最後にfocusされたitemが存在しない場合はすべて0
    if (!lastFocusedId) {
      return 0;
    }

    // 最後にfocusされたitemは0
    if (lastFocused) {
      return 0;
    }

    return -1;
  }, [focusedId, lastFocused, lastFocusedId]);

  return (
    <div
      role="none"
      className={className}
      ref={draggable ? drag : null}
      data-testid={`dragLayer-${itemId}`}
      onMouseDown={e => {
        // ListのpreventDefaultを回避
        e.stopPropagation();
      }}
    >
      <MuiListItem
        className={`list-item ${focused && 'focused'}`}
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
        tabIndex={tabIndex}
      >
        {children}
      </MuiListItem>
      <DragPreviewImage
        connect={preview}
        src={`${process.env.PUBLIC_URL}/note.svg`}
      />
    </div>
  );
});

const StyledComponent = styled(Component)`
  & > .list-item {
    border: 1px solid ${props => props.theme.palette.primary.light};
    border-radius: 10px;

    &.focused {
      background-color: ${props => props.theme.palette.action.hover};
      border: 1px solid ${props => props.theme.palette.secondary.light};
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
  }
`;

export const ListItem = StyledComponent;
