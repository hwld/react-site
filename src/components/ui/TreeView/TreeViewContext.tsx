import * as React from 'react';

export type TreeNode = {
  id: string;
  expanded: boolean;
  childrenId: string[];
};

export type ParentIdWithChildrenId = {
  parentId: string;
  childrenId: string[];
};

type TreeViewContextValue = {
  multiple: boolean;
  nodes: TreeNode[];
  addNodeId: (id: string) => void;
  addNodeChildrenId: (id: string, children: string[]) => void;
  removeNodeId: (id: string) => void;
  selectedIds: string[];
  selectIds: (ids: string[]) => void;
  setExpanded: (id: string, isExpand: boolean) => void;
  isDrag: boolean;
  onDrop: (sourceIds: string[], targetId: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  multiple: false,
  nodes: [],
  selectedIds: [],
  isDrag: false,

  addNodeId: () => {},
  addNodeChildrenId: () => {},
  removeNodeId: () => {},
  selectIds: () => {},
  setExpanded: () => {},
  onDrop: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
