import * as React from 'react';

type ListContextValue = {
  selectedIds: string[];
  draggable: boolean;
  selectItem: (ids: string[]) => void;
  removeItemId: (id: string) => void;
};

const ListContext = React.createContext<ListContextValue>({
  selectedIds: [],
  draggable: false,

  selectItem: () => {},
  removeItemId: () => {},
});

export const ListContextProvider: React.FC<{ value: ListContextValue }> = ({
  children,
  value,
}) => {
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'TreeViewContext';
}

export default ListContext;
