import * as React from 'react';

export type TreeNode = {
  id: string;
  expanded: boolean;
  childrenId: string[];
  element: HTMLElement;
};

export type ParentIdWithChildrenId = {
  parentId: string;
  childrenId: string[];
};

type TreeViewContextValue = {
  multiple: boolean;
  nodes: TreeNode[];
  addNodeId: (id: string, element: HTMLElement) => void;
  addNodeChildrenId: (id: string, children: string[]) => void;
  removeNodeId: (id: string) => void;
  selectedIds: string[];
  selectIds: (ids: string[]) => void;
  setExpanded: (id: string, isExpand: boolean) => void;
  draggable: boolean;
  onDrop: (sourceId: string[], targetId: string) => void;
};

const TreeViewContext = React.createContext<TreeViewContextValue>({
  multiple: false,
  nodes: [],
  selectedIds: [],
  draggable: false,

  addNodeId: () => {},
  addNodeChildrenId: () => {},
  removeNodeId: () => {},
  selectIds: () => {},
  setExpanded: () => {},
  onDrop: () => {},
});

export const TreeViewContextProvider: React.FC<{
  value: TreeViewContextValue;
}> = ({ children, value }) => {
  return (
    <TreeViewContext.Provider value={value}>
      {children}
    </TreeViewContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export { TreeViewContext };
