import * as React from 'react';

export type TreeNode = {
  id: string;
  expanded: boolean;
};

type TreeViewContextValue = {
  nodes: TreeNode[];
  addNode: (id: string) => void;
  removeNode: (id: string) => void;
  selectedId: string;
  selectNode: (id: string) => void;
  expandNode: (id: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  nodes: [],
  selectedId: '',

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  expandNode: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
