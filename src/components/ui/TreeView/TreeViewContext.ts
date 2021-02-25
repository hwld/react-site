import * as React from 'react';

type TreeViewContextValue = {
  focus: (id: string) => void;
  focusFirstNode: () => void;
  focusLastNode: () => void;
  focusNextNode: (id: string) => void;
  focusPreviousNode: (id: string) => void;
  expandAllSiblings: (event: React.SyntheticEvent, id: string) => void;
  toggleExpansion: (event: React.SyntheticEvent, value?: string | null) => void;
  isExpanded: (id: string) => boolean;
  isFocused: (id: string) => boolean;
  isSelected: (id: string) => boolean;
  isDescendantOfSelected: (id: string) => boolean;
  selectNode: (id: string | null, multiple?: boolean) => boolean;
  selectRange: (
    event: React.SyntheticEvent,
    nodes: {
      start?: string | undefined;
      end: string | null;
      current?: string | undefined;
    },
    stacked?: boolean,
  ) => boolean;
  selectNextNode: (event: React.SyntheticEvent, id: string) => boolean;
  selectPreviousNode: (event: React.SyntheticEvent, id: string) => boolean;
  rangeSelectToFirst: (event: React.SyntheticEvent, id: string) => boolean;
  rangeSelectToLast: (event: React.SyntheticEvent, id: string) => boolean;
  selectAllNodes: (event: React.SyntheticEvent) => boolean;
  multiSelect: boolean;
  getParent: (id: string) => string | null | undefined;
  addNodeToNodeMap: (
    id: string,
    childrenIds: string[],
    expandable: boolean,
  ) => void;
  removeNodeFromNodeMap: (id: string) => void;
  setRemovedNode: (id: string) => void;
  draggable: boolean;
  dropToSelected: (targetId: string) => void;
};

/**
 * @ignore - internal component.
 */
const TreeViewContext = React.createContext<TreeViewContextValue>({
  focus: () => {},
  focusFirstNode: () => {},
  focusLastNode: () => {},
  focusNextNode: () => {},
  focusPreviousNode: () => {},
  expandAllSiblings: () => {},
  toggleExpansion: () => {},
  isExpanded: () => false,
  isFocused: () => false,
  isSelected: () => false,
  isDescendantOfSelected: () => false,
  selectNode: () => false,
  selectRange: () => false,
  selectNextNode: () => false,
  selectPreviousNode: () => false,
  rangeSelectToFirst: () => false,
  rangeSelectToLast: () => false,
  selectAllNodes: () => false,
  multiSelect: false,
  getParent: () => null,
  addNodeToNodeMap: () => {},
  removeNodeFromNodeMap: () => {},
  setRemovedNode: () => {},
  draggable: false,
  dropToSelected: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export { TreeViewContext };
