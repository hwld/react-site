import * as React from 'react';

export type TreeNode = {
  id: string;
  expanded: boolean;
};

type TreeViewContextValue = {
  nodes: TreeNode[];
  addNode: (id: string) => void;
  removeNode: (id: string) => void;
  selectedIds: string[];
  changeSelectedIds: (id: string, withCtrKey: boolean) => void;
  expandNode: (id: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  nodes: [],
  selectedIds: [],

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeNode: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeSelectedIds: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  expandNode: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
