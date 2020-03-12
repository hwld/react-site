import * as React from 'react';

type TreeViewContextValue = {
  selectedId?: string;
  selectNode?: (id: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
