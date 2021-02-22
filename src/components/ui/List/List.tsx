import React, { useState, useCallback, useEffect, useRef } from 'react';
import { List as MuiList } from '@material-ui/core';
import { ListContextProvider } from './ListContext';

type Props = {
  className?: string;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  draggable?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

export const Component = React.forwardRef<
  HTMLUListElement,
  React.PropsWithChildren<Props>
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
  // removeItemが直接onSelectに依存しないようにするために、内部的な選択状態を作成する。
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

  const unFocus = (id: string | null) => {
    if (id && focusedId === id) {
      blur();
    }
  };

  const focusNextItem = (id: string) => {
    focus(getNextItem(id));
  };
  const focusPrevItem = (id: string) => {
    focus(getPrevItem(id));
  };
  const focusFirstNode = () => focus(getFirstItem());

  // 内部の選択状態と外部の選択状態を同時に設定する
  const selectItem = useCallback(
    (ids: string[]) => {
      onSelect(ids);
      setInternalSelectedIds(ids);
    },
    [onSelect],
  );

  // ここにonSelectの依存関係を入れると、onSelectが変更されたときにremoveItemIdが変更されて、ListItemの破棄時以外にも実行されてしまう。
  // そのため、選択状態の内部状態であるInternalSelectedIdsを作る。
  const removeItemId = useCallback((targetId: string) => {
    setInternalSelectedIds(ids => ids.filter(id => id !== targetId));
  }, []);

  // ListItemのfocusイベントをstopPropagationを使って伝搬させないようにしていることが前提
  const handleFocus = () => {
    if (!focusedId) {
      if (selectedIds.length !== 0) {
        focus(selectedIds[selectedIds.length - 1]);
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
        } else {
          focusFirstNode();
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
    selectItem([]);

    const element = document.activeElement;
    if (focusedId && element instanceof HTMLElement) {
      element.blur();
    }
    setFocusedId(null);
  };

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
      blur();
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
