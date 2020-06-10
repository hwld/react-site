import * as React from 'react';

export type TreeNode = {
  id: string;
  expanded: boolean;
};

type TreeViewContextValue = {
  multiple: boolean;
  nodes: TreeNode[];
  addNode: (id: string) => void;
  removeNode: (id: string) => void;
  selectedIds: string[];
  selectIds: (ids: string[]) => void;
  expandNode: (id: string) => void;
  onDrop: (sourceIds: string[], targetId: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  multiple: false,
  nodes: [],
  selectedIds: [],

  addNode: () => {},
  removeNode: () => {},
  selectIds: () => {},
  expandNode: () => {},
  onDrop: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
