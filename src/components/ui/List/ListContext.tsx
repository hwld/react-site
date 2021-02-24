import * as React from 'react';

type ListContextValue = {
  draggable: boolean;
  selectedIds: string[];
  selectItem: (ids: string[]) => void;
  removeItemId: (id: string) => void;
  isFocused: (id: string) => boolean;
  focus: (id: string) => void;
  unFocus: (id: string) => void;
  focusNextItem: (id: string) => void;
  focusPrevItem: (id: string) => void;
};

const ListContext = React.createContext<ListContextValue>({
  draggable: false,
  selectedIds: [],
  selectItem: () => {},
  removeItemId: () => {},
  isFocused: () => false,
  focus: () => {},
  unFocus: () => {},
  focusNextItem: () => {},
  focusPrevItem: () => {},
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

export { ListContext };
