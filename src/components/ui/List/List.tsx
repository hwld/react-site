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
  selectedIds?: string[];
  onSelect?: (ids: string[]) => void;
  isDrag?: boolean;
}

const List: React.FC<ListProps> = ({
  children,
  className,
  selectedIds = [],
  onSelect = () => {},
  isDrag = false,
}) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState(selectedIds);

  // 内部の選択状態と外部の選択状態を同時に設定する
  const selectItem = useCallback(
    (ids: string[]) => {
      setInternalSelectedIds(ids);
      onSelect(ids);
    },
    [onSelect],
  );

  useEffect(() => {
    if (internalSelectedIds.length !== selectedIds.length) {
      onSelect(internalSelectedIds);
    }
  }, [internalSelectedIds, onSelect, selectedIds.length]);

  const removeItemId = useCallback((id: string) => {
    setInternalSelectedIds(ids => ids.filter(selectId => selectId !== id));
  }, []);

  return (
    <ListContext.Provider
      value={{ selectedIds, isDrag, selectItem, removeItemId }}
    >
      <StyledMuiList className={className}>{children}</StyledMuiList>
    </ListContext.Provider>
  );
};

export default List;
