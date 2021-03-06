import React, { useState, useCallback, useEffect, useRef } from 'react';
import { List as MuiList } from '@material-ui/core';
import { ListContextProvider } from './ListContext';

export type ListProps = {
  className?: string;
  selected?: string[];
  onSelect?: (ids: string[]) => void;
  focused?: string | null;
  onSetFocused?: (id: string | null) => void;
  draggable?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

export const Component = React.forwardRef<
  HTMLUListElement,
  React.PropsWithChildren<ListProps>
>(function List(
  {
    children,
    className,
    selected = [],
    onSelect = () => {},
    focused: focusedProp,
    onSetFocused,
    draggable = false,
    onKeyDown = () => {},
  },
  ref,
) {
  // focusedProp、onSetFocusedが渡されなかった場合に使用する
  const [internalFocused, setInternalFocused] = useState<string | null>(null);
  const focused = focusedProp !== undefined ? focusedProp : internalFocused;
  const setFocus = useCallback(
    (id: string | null) => {
      if (onSetFocused) {
        onSetFocused(id);
      } else {
        setInternalFocused(id);
      }
    },
    [onSetFocused],
  );

  const [lastFocused, setLastFocused] = useState(focused);

  const nodeIds = useRef<string[]>([]);

  // Node Helpers

  const getNextItem = (id: string) => {
    const itemIndex = nodeIds.current.indexOf(id);
    if (itemIndex !== -1 && itemIndex + 1 < nodeIds.current.length) {
      return nodeIds.current[itemIndex + 1];
    }

    return null;
  };

  const getPrevItem = (id: string) => {
    const itemIndex = nodeIds.current.indexOf(id);
    if (itemIndex !== -1 && itemIndex - 1 >= 0) {
      return nodeIds.current[itemIndex - 1];
    }

    return null;
  };

  const getFirstItem = () => {
    if (nodeIds.current.length !== 0) {
      return nodeIds.current[0];
    }

    return null;
  };

  // Status Helpers

  const isFocused = (id: string) => focused === id;
  const isLastFocused = (id: string) => lastFocused === id;

  // Focus Helpers

  const focus = (id: string) => {
    setFocus(id);
  };

  const unFocus = (id: string) => {
    if (focused === id) {
      setFocus(null);
    }
    setLastFocused(id);
  };

  const focusNextItem = (id: string) => {
    const item = getNextItem(id);
    if (item) {
      focus(item);
    }
  };
  const focusPrevItem = (id: string) => {
    const item = getPrevItem(id);
    if (item) {
      focus(item);
    }
  };
  const focusFirstNode = () => {
    const item = getFirstItem();
    if (item) {
      focus(item);
    }
  };

  // ListItemのfocusイベントをstopPropagationを使って伝搬させないようにしていることが前提
  const handleFocus = () => {
    if (!focused) {
      if (lastFocused) {
        focus(lastFocused);
      } else if (selected.length !== 0) {
        focus(selected[selected.length - 1]);
      } else {
        focusFirstNode();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'ArrowUp': {
        if (focused) {
          focusPrevItem(focused);
        } else if (lastFocused) {
          focusPrevItem(lastFocused);
        }
        break;
      }
      case 'ArrowDown': {
        if (focused) {
          focusNextItem(focused);
        } else if (lastFocused) {
          focusNextItem(lastFocused);
        }
        break;
      }
      default: {
        break;
      }
    }

    onKeyDown(event);
  };

  const handleClick = () => {
    onSelect([]);

    const element = document.activeElement;
    if (focused && element instanceof HTMLElement) {
      element.blur();
      setFocus(null);
    }
  };

  // nodeを収集する
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
    nodeIds.current = newItemIds;
  }, [children]);

  const [removedItemIds, setRemovedItemIds] = useState<string[]>([]);
  const removeItemId = useCallback((id: string) => {
    setRemovedItemIds(ids => [...ids, id]);
  }, []);

  // 削除されたノードの後処理
  useEffect(() => {
    if (removedItemIds.length !== 0) {
      // 選択状態から外す
      const newSelected = selected.filter(id => !removedItemIds.includes(id));
      onSelect(newSelected);

      // フォーカス状態を外す
      if (focused && removedItemIds.includes(focused)) {
        setFocus(null);
      }

      // 最後のフォーカス状態を外す
      if (lastFocused && removedItemIds.includes(lastFocused)) {
        setLastFocused(null);
      }

      setRemovedItemIds([]);
    }
  }, [focused, lastFocused, onSelect, removedItemIds, selected, setFocus]);

  return (
    <ListContextProvider
      value={{
        focusedId: focused,
        lastFocusedId: lastFocused,
        selected,
        draggable,
        selectItem: onSelect,
        removeItemId,
        isFocused,
        isLastFocused,
        focus,
        unFocus,
        focusNextItem,
        focusPrevItem,
      }}
    >
      <MuiList
        className={className}
        ref={ref}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onClick={handleClick}
        onMouseDown={e => {
          e.preventDefault();
        }}
        tabIndex={-1}
      >
        {children}
      </MuiList>
    </ListContextProvider>
  );
});

export const List = Component;
