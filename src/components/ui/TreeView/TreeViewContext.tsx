import * as React from 'react';

export type TreeNode = {
  id: string;
  expanded: boolean;
};

type TreeViewContextValue = {
  selectedId: string;
  selectNode: (id: string) => void;
  expandedIds: string[];
  expandNode: (id: string) => void;
  addNode: (id: string) => void;
  removeNode: (id: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  selectedId: '',
  expandedIds: [],

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  expandNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeNode: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
