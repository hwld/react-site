import React, { useState, useCallback, useEffect, useRef } from 'react';
import { List as MuiList } from '@material-ui/core';
import styled from 'styled-components';
import { ListContextProvider } from './ListContext';

const StyledMuiList = styled(MuiList)`
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
`;

type ListProps = {
  className?: string;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  draggable?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

export const List = React.forwardRef<
  HTMLUListElement,
  React.PropsWithChildren<ListProps>
>(function List(
  {
    children,
    className,
    selectedIds = [],
    onSelect = () => {},
    draggable = false,
    onKeyDown = () => {},
  },
  ref,
) {
  const [internalSelectedIds, setInternalSelectedIds] = useState(selectedIds);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const itemIds = useRef<string[]>([]);

  const isFocused = (id: string) => focusedId === id;

  const getNextItem = (id: string) => {
    const itemIndex = itemIds.current.indexOf(id);
    if (itemIndex !== -1 && itemIndex + 1 < itemIds.current.length) {
      return itemIds.current[itemIndex + 1];
    }

    return null;
  };

  const getPrevItem = (id: string) => {
    const itemIndex = itemIds.current.indexOf(id);
    if (itemIndex !== -1 && itemIndex - 1 >= 0) {
      return itemIds.current[itemIndex - 1];
    }

    return null;
  };

  const getFirstItem = () => {
    if (itemIds.current.length !== 0) {
      return itemIds.current[0];
    }

    return null;
  };

  const focus = (id: string | null) => {
    if (id) {
      setFocusedId(id);
    }
  };

  const blur = () => {
    setFocusedId(null);
  };

  const focusNextItem = (id: string) => {
    focus(getNextItem(id));
  };
  const focusPrevItem = (id: string) => {
    focus(getPrevItem(id));
  };
  const focusFirstNode = () => focus(getFirstItem());

  const handleFocus = () => {
    if (!focusedId) {
      if (selectedIds.length !== 0) {
        focus(selectedIds[0]);
      } else {
        focusFirstNode();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'ArrowUp': {
        if (focusedId) {
          focusPrevItem(focusedId);
        }
        break;
      }
      case 'ArrowDown': {
        if (focusedId) {
          focusNextItem(focusedId);
        }
        break;
      }
      default: {
        break;
      }
    }

    onKeyDown(event);
  };

  // 内部の選択状態と外部の選択状態を同時に設定する
  const selectItem = useCallback(
    (ids: string[]) => {
      onSelect(ids);
      setInternalSelectedIds(ids);
    },
    [onSelect],
  );

  const removeItemId = useCallback((targetId: string) => {
    setInternalSelectedIds(ids => ids.filter(id => id !== targetId));
  }, []);

  // 内部の選択状態と外部の選択状態の同期をとる
  useEffect(() => {
    if (internalSelectedIds.length !== selectedIds.length) {
      onSelect(internalSelectedIds);
    }
  }, [internalSelectedIds, onSelect, selectedIds]);

  // itemを収集する
  useEffect(() => {
    const newItemIds: string[] = [];
    React.Children.forEach(children, child => {
      if (
        React.isValidElement(child) &&
        child.props.itemId &&
        typeof child.props.itemId === 'string'
      ) {
        newItemIds.push(child.props.itemId);
      }
    });
    itemIds.current = newItemIds;
  }, [children]);

  useEffect(() => {
    if (focusedId && !itemIds.current.includes(focusedId)) {
      focus(getFirstItem());
    }
  }, [children, focusedId]);

  return (
    <ListContextProvider
      value={{
        selectedIds,
        draggable,
        selectItem,
        removeItemId,
        isFocused,
        focus,
        focusNextItem,
        focusPrevItem,
      }}
    >
      <StyledMuiList
        className={className}
        ref={ref}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        tabIndex={0}
      >
        {children}
      </StyledMuiList>
    </ListContextProvider>
  );
});
