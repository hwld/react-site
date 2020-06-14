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
  isDrag?: boolean;
}

const List: React.FC<ListProps> = ({
  children,
  className,
  onSelect = () => {},
  isDrag = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [ItemIds, addItemIds] = useState<string[]>([]);

  // 内部の選択状態と外部の選択状態を同時に設定する
  const setSelectedIdsWithExternal = useCallback(
    (ids: string[]) => {
      setSelectedIds(ids);
      onSelect(ids);
    },
    [onSelect],
  );

  // 選択されているアイテムのうち、存在しないアイテムを外す.
  useEffect(() => {
    selectedIds.forEach(selectedId => {
      if (!ItemIds.includes(selectedId)) {
        setSelectedIdsWithExternal(selectedIds.filter(id => id !== selectedId));
      }
    });
  }, [ItemIds, selectedIds, setSelectedIdsWithExternal]);

  const addItemId = useCallback((id: string) => {
    addItemIds(ids => [...ids, id]);
  }, []);

  const removeItemId = useCallback((id: string) => {
    addItemIds(ids => ids.filter(nodeId => nodeId !== id));
  }, []);

  const selectItem = useCallback(
    (ids: string[]) => {
      setSelectedIdsWithExternal(ids);
    },
    [setSelectedIdsWithExternal],
  );

  return (
    <ListContext.Provider
      value={{ selectedIds, isDrag, selectItem, addItemId, removeItemId }}
    >
      <StyledMuiList className={className}>{children}</StyledMuiList>
    </ListContext.Provider>
  );
};

export default List;
