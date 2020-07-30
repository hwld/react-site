import React, { useState, useCallback, useEffect } from 'react';
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

  useEffect(() => {
    if (internalSelectedIds.length !== selectedIds.length) {
      onSelect(internalSelectedIds);
    }
  }, [internalSelectedIds, onSelect, selectedIds]);

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

  return (
    <ListContextProvider
      value={{ selectedIds, draggable, selectItem, removeItemId }}
    >
      <StyledMuiList className={className}>{children}</StyledMuiList>
    </ListContextProvider>
  );
};

export { List };
