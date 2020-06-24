import * as React from 'react';

type ListContextValue = {
  selectedIds: string[];
  isDrag: boolean;
  selectItem: (ids: string[]) => void;
  removeItemId: (id: string) => void;
};

const ListContext = React.createContext<ListContextValue>({
  selectedIds: [],
  isDrag: false,

  selectItem: () => {},
  removeItemId: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'TreeViewContext';
}

export default ListContext;
