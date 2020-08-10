import React, { useState, useCallback, useEffect, useRef } from 'react';
import { List as MuiList } from '@material-ui/core';
import styled from 'styled-components';
import { ListContextProvider } from './ListContext';

const StyledMuiList = styled(MuiList)`
  padding-top: 0;
  padding-bottom: 0;
`;

type ListProps = {
  className?: string;
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  draggable?: boolean;
};

const List: React.FC<ListProps> = ({
  children,
  className,
  selectedIds = [],
  onSelect = () => {},
  draggable = false,
}) => {
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

  const focus = (id: string | null) => {
    if (id) {
      setFocusedId(id);
    }
  };

  const focuseNextItem = (id: string) => {
    focus(getNextItem(id));
  };
  const focusePrevItem = (id: string) => {
    focus(getPrevItem(id));
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

  return (
    <ListContextProvider
      value={{
        selectedIds,
        draggable,
        selectItem,
        removeItemId,
        isFocused,
        focuseNextItem,
        focusePrevItem,
      }}
    >
      <StyledMuiList className={className}>{children}</StyledMuiList>
    </ListContextProvider>
  );
};

export { List };
