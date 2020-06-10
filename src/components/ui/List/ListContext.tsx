import * as React from 'react';

type ListContextValue = {
  selectedIds: string[];
  selectItem: (id: string) => void;
  addItemId: (id: string) => void;
  removeItemId: (id: string) => void;
};

const ListContext = React.createContext<ListContextValue>({
  selectedIds: [],

  selectItem: () => {},
  addItemId: () => {},
  removeItemId: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'TreeViewContext';
}

export default ListContext;
