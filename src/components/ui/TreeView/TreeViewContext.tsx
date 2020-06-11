import * as React from 'react';

export type TreeNode = {
  id: string;
  expanded: boolean;
};

export type ParentIdWithChildrenId = {
  parentId: string;
  childrenId: string[];
};

type TreeViewContextValue = {
  multiple: boolean;
  nodes: TreeNode[];
  nodeChildrenId: ParentIdWithChildrenId[];
  addNodeId: (id: string) => void;
  addNodeChildrenId: (id: string, children: string[]) => void;
  removeNodeId: (id: string) => void;
  removeNodeChildrenId: (id: string) => void;
  selectedIds: string[];
  selectIds: (ids: string[]) => void;
  expandNode: (id: string) => void;
  onDrop: (sourceIds: string[], targetId: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  multiple: false,
  nodes: [],
  nodeChildrenId: [],
  selectedIds: [],

  addNodeId: () => {},
  addNodeChildrenId: () => {},
  removeNodeId: () => {},
  removeNodeChildrenId: () => {},
  selectIds: () => {},
  expandNode: () => {},
  onDrop: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
