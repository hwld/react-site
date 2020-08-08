import * as React from 'react';

type TreeViewContextValue = {
  focus: (id: string | null) => void;
  focusFirstNode: () => void;
  focusLastNode: () => void;
  focusNextNode: (id: string) => void;
  focusPreviousNode: (id: string) => void;
  expandAllSiblings: (event: React.SyntheticEvent, id: string) => void;
  toggleExpansion: (event: React.SyntheticEvent, value?: string | null) => void;
  isExpanded: (id: string) => boolean;
  isFocused: (id: string) => boolean;
  isSelected: (id: string) => boolean;
  selectNode: (
    event: React.SyntheticEvent,
    id: string,
    multiple?: boolean,
  ) => boolean;
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
  isTabbable: (id: string) => boolean;
  multiSelect: boolean;
  getParent: (id: string) => string | null | undefined;
  addNodeToNodeMap: (id: string, childrenIds: string[]) => void;
  removeNodeFromNodeMap: (id: string) => void;
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
  selectNode: () => false,
  selectRange: () => false,
  selectNextNode: () => false,
  selectPreviousNode: () => false,
  rangeSelectToFirst: () => false,
  rangeSelectToLast: () => false,
  selectAllNodes: () => false,
  isTabbable: () => false,
  multiSelect: false,
  getParent: () => null,
  addNodeToNodeMap: () => {},
  removeNodeFromNodeMap: () => {},
});

if (process.env.NODE_ENV !== 'production') {
  TreeViewContext.displayName = 'TreeViewContext';
}

export default TreeViewContext;
