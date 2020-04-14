import * as React from 'react';

type ListContextValue = {
  selectedIds?: string[];
  selectItem?: (id: string) => void;
  setItemId?: (id: string) => void;
  unsetItemId?: (id: string) => void;
};

const ListContext = React.createContext<ListContextValue>({});

if (process.env.NODE_ENV !== 'production') {
  ListContext.displayName = 'TreeViewContext';
}

export default ListContext;
