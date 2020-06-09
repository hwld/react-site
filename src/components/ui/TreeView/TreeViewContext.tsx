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
  onDrop: (sourceIds: string[], targetId: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  nodes: [],
  selectedIds: [],

  addNode: () => {},  
  removeNode: () => {},
  changeSelectedIds: () => {},
  expandNode: () => {},
  onDrop: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
