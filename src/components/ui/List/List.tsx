import React, { useState, useCallback, useEffect } from 'react';
import { List as MuiList } from '@material-ui/core';
import styled from 'styled-components';
import ListContext from './ListContext';

const StyledMuiList = styled(MuiList)`
  padding-top: 0;
  padding-bottom: 0;
`;

interface ListProps {
  className?: string;
  onSelect?: (ids: string[]) => void;
}

const List: React.FC<ListProps> = ({ children, className, onSelect }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [ItemIds, setItemIds] = useState<string[]>([]);

  useEffect(() => {
    if (onSelect) onSelect(selectedIds);
  }, [onSelect, selectedIds]);

  useEffect(() => {
    selectedIds.forEach(selectedId => {
      if (!ItemIds.includes(selectedId)) {
        setSelectedIds(ids => ids.filter(id => id !== selectedId));
      }
    });
  }, [ItemIds, selectedIds]);

  // Listの破棄時に外部の選択状態を解除する
  // 再レンダリング前提の破棄と区別がつけられないので再レンダリング時には選択状態を戻す
  useEffect(() => {
    if (selectedIds.length === 0) {
      if (onSelect) onSelect(selectedIds);
    }

    return () => {
      if (onSelect) onSelect([]);
    };
  }, [onSelect, selectedIds]);

  const setItemId = useCallback((id: string) => {
    setItemIds(ids => [...ids, id]);
  }, []);

  const unsetItemId = useCallback((id: string) => {
    setItemIds(ids => ids.filter(nodeId => nodeId !== id));
  }, []);

  const selectItem = useCallback(
    (id: string) => {
      if (selectedIds.includes(id)) {
        setSelectedIds(ids => ids.filter(itemId => itemId !== id));
      } else {
        setSelectedIds(ids => [...ids, id]);
      }
    },
    [selectedIds],
  );

  return (
    <ListContext.Provider
      value={{ selectedIds, selectItem, setItemId, unsetItemId }}
    >
      <StyledMuiList className={className}>{children}</StyledMuiList>
    </ListContext.Provider>
  );
};

export default List;
