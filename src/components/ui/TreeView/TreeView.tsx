import React, {
  Children,
  forwardRef,
  isValidElement,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useControlled } from '@material-ui/core/utils';
import { WithStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDrop } from 'react-dnd';
import { TreeViewContext } from './TreeViewContext';
import { ItemTypes } from '../ItemTypes';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    outline: 'none',
  },
  doropLayer: {
    height: '100%',
  },
});

function arrayDiff<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) return true;

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) return true;
  }

  return false;
}

export type TreeViewProps = WithStyles<typeof styles> & {
  className?: string;
  defaultExpanded?: string[];
  defaultSelected?: string[];
  defaultFocused?: string | null;
  disableSelection?: boolean;
  multiSelect?: boolean;
  expanded?: string[];
  onExpand?: (expanded: string[]) => void;
  onNodeSelect?: (ids: string[]) => void;
  selected?: string[];
  focused?: string | null;
  onSetFocused?: (id: string | null) => void;
  draggable?: boolean;
  onDrop?: (sourceId: string[], targetId: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

const Component = forwardRef<
  HTMLUListElement,
  PropsWithChildren<TreeViewProps>
>(function TreeView(
  {
    children,
    className,
    classes,
    defaultExpanded = [],
    defaultSelected = [],
    disableSelection = false,
    multiSelect = false,
    expanded: expandedProp,
    onExpand,
    onNodeSelect,
    selected: selectedProp,
    focused: focusedProp,
    onSetFocused: onSetFocusedProp,
    draggable = false,
    onDrop = () => {},
    onKeyDown = () => {},
  },
  ref,
) {
  const [internalFocused, setInternalFocusedId] = useState<string | null>(null);

  const focused = focusedProp !== undefined ? focusedProp : internalFocused;
  const setFocused = useCallback(
    (id: string | null) => {
      if (onSetFocusedProp) {
        onSetFocusedProp(id);
      } else {
        setInternalFocusedId(id);
      }
    },
    [onSetFocusedProp],
  );

  const [lastFocused, setLastFocused] = useState<string | null>(focused);

  const nodeMap = useRef(
    new Map<
      string,
      { parent?: string | null; children: string[]; expandable: boolean }
    >(),
  );

  const visibleNodes = useRef<string[]>([]);

  // expandedPropがundefinedではない場合はsetExpandedStateで何も起こらない.
  // 外側で開閉状態を制御する必要がある.
  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'TreeView',
    state: 'expanded',
  });

  const [selected, setSelectedState] = useControlled({
    controlled: selectedProp,
    default: defaultSelected,
    name: 'TreeView',
    state: 'selected',
  });

  /*
   * Node Helpers
   */

  const getNextNode = (id: string) => {
    const nodeIndex = visibleNodes.current.indexOf(id);
    if (nodeIndex !== -1 && nodeIndex + 1 < visibleNodes.current.length) {
      return visibleNodes.current[nodeIndex + 1];
    }

    return null;
  };

  const getPreviousNode = (id: string) => {
    const nodeIndex = visibleNodes.current.indexOf(id);
    if (nodeIndex !== -1 && nodeIndex - 1 >= 0) {
      return visibleNodes.current[nodeIndex - 1];
    }

    return null;
  };

  const getLastNode = () =>
    visibleNodes.current[visibleNodes.current.length - 1];
  const getFirstNode = () => visibleNodes.current[0];
  const getParent = (id: string) => nodeMap.current.get(id)?.parent;

  const getNodesInRange = (a: string | null, b: string | null) => {
    const aIndex = a ? visibleNodes.current.indexOf(a) : -1;
    const bIndex = b ? visibleNodes.current.indexOf(b) : -1;
    const start = Math.min(aIndex, bIndex);
    const end = Math.max(aIndex, bIndex);

    return visibleNodes.current.slice(start, end + 1);
  };

  const getAllDescendants = useCallback((id: string): string[] => {
    const node = nodeMap.current.get(id);
    if (!node) {
      return [];
    }

    const descendants = node.children.flatMap(childId =>
      getAllDescendants(childId),
    );

    return [...node.children, ...descendants];
  }, []);

  /*
   * Status Helpers
   */
  const isExpanded = useCallback(
    (id: string) => {
      return expanded.indexOf(id) !== -1;
    },
    [expanded],
  );

  const isSelected = useCallback(
    (id: string) => {
      return selected.indexOf(id) !== -1;
    },
    [selected],
  );

  const isDescendantOfSelected = useCallback(
    (id: string) => {
      const descendantsOfSelected = selected.flatMap(selectedId =>
        getAllDescendants(selectedId),
      );

      return descendantsOfSelected.includes(id);
    },
    [getAllDescendants, selected],
  );

  // TreeItemにfocusが当たっているか
  const isFocused = (id: string) => focused === id;

  // TreeItemが最後にfocusを当てられたか
  const isLastFocused = (id: string) => lastFocused === id;

  /*
   * Focus Helpers
   */

  const focus = (id: string) => {
    setFocused(id);
  };

  const unFocus = (id: string) => {
    if (focused === id) {
      setFocused(null);
    }
    setLastFocused(id);
  };

  const focusNextNode = (id: string) => {
    const next = getNextNode(id);
    if (next) {
      focus(next);
    }
  };
  const focusPreviousNode = (id: string) => {
    const prev = getPreviousNode(id);
    if (prev) {
      focus(prev);
    }
  };
  const focusFirstNode = () => {
    focus(getFirstNode());
  };
  const focusLastNode = () => {
    focus(getLastNode());
  };

  const handleFocus = () => {
    if (!focused) {
      if (lastFocused) {
        focus(lastFocused);
      } else if (selected.length !== 0) {
        focus(selected[selected.length - 1]);
      } else {
        focusFirstNode();
      }
    }
  };

  /*
   * Expansion Helpers
   */

  const toggleExpansion = (event: React.SyntheticEvent, value = focused) => {
    if (value !== null) {
      let newExpanded: string[];
      if (expanded.indexOf(value) !== -1) {
        newExpanded = expanded.filter(id => id !== value);
      } else {
        newExpanded = [value].concat(expanded);
      }

      setExpandedState(newExpanded);
      if (onExpand) {
        onExpand(newExpanded);
      }
    }
  };

  const expandAllSiblings = (event: React.SyntheticEvent, id: string) => {
    const map = nodeMap.current.get(id);
    const parent =
      map && map.parent ? nodeMap.current.get(map.parent) : undefined;

    let diff;
    if (parent) {
      diff = parent.children.filter(child => !isExpanded(child));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const topLevelNodes = nodeMap.current.get('-1')!.children;
      diff = topLevelNodes.filter(node => !isExpanded(node));
    }
    const newExpanded = expanded.concat(diff);

    if (diff.length > 0) {
      setExpandedState(newExpanded);
    }
  };

  /*
   * Selection Helpers
   */

  const lastSelectedNode = useRef<string | null>(null);
  const lastSelectionWasRange = useRef(false);
  const currentRangeSelection = useRef<string[]>([]);

  const handleRangeArrowSelect = (
    event: React.SyntheticEvent,
    nodes: { start?: string | null; next?: string | null; current?: string },
  ) => {
    let base = selected;
    const { start, next, current } = nodes;

    if (!next || !current) {
      return;
    }

    if (currentRangeSelection.current.indexOf(current) === -1) {
      currentRangeSelection.current = [];
    }

    if (lastSelectionWasRange.current) {
      if (currentRangeSelection.current.indexOf(next) !== -1) {
        base = base.filter(id => id === start || id !== current);
        currentRangeSelection.current = currentRangeSelection.current.filter(
          id => id === start || id !== current,
        );
      } else {
        base.push(next);
        currentRangeSelection.current.push(next);
      }
    } else {
      base.push(next);
      currentRangeSelection.current.push(current, next);
    }

    if (onNodeSelect) {
      onNodeSelect(base);
    }

    setSelectedState(base);
  };

  const handleRangeSelect = (
    event: React.SyntheticEvent,
    nodes: { start: string | null; end: string | null },
  ) => {
    let base = selected;
    const { start, end } = nodes;
    // If last selection was a range selection ignore nodes that were selected.
    if (lastSelectionWasRange.current) {
      base = selected.filter(
        id => currentRangeSelection.current.indexOf(id) === -1,
      );
    }

    const range = getNodesInRange(start, end);
    currentRangeSelection.current = range;
    let newSelected = base.concat(range);
    newSelected = newSelected.filter((id, i) => newSelected.indexOf(id) === i);

    if (onNodeSelect) {
      onNodeSelect(newSelected);
    }

    setSelectedState(newSelected);
  };

  const handleMultipleSelect = (value: string) => {
    let newSelected: string[] = [];
    if (selected.indexOf(value) !== -1) {
      newSelected = selected.filter(id => id !== value);
    } else {
      newSelected = [value].concat(selected);
    }

    if (onNodeSelect) {
      onNodeSelect(newSelected);
    }

    setSelectedState(newSelected);
  };

  const handleSingleSelect = (value: string) => {
    const newSelected =
      selected.length === 1 && selected[0] === value ? [] : [value];

    if (onNodeSelect) {
      onNodeSelect(newSelected);
    }

    setSelectedState(newSelected);
  };

  const clearSelect = () => {
    if (onNodeSelect) {
      onNodeSelect([]);
    }
  };

  const selectNode = (id: string | null, multiple = false) => {
    if (!id) {
      clearSelect();
    } else if (multiple) {
      handleMultipleSelect(id);
    } else {
      handleSingleSelect(id);
    }
    lastSelectedNode.current = id;
    lastSelectionWasRange.current = false;
    currentRangeSelection.current = [];

    return true;
  };

  const selectRange = (
    event: React.SyntheticEvent,
    nodes: { start?: string; end: string | null; current?: string },
    stacked = false,
  ) => {
    const { start = lastSelectedNode.current, end, current } = nodes;
    if (stacked) {
      handleRangeArrowSelect(event, { start, next: end, current });
    } else {
      handleRangeSelect(event, { start, end });
    }
    lastSelectionWasRange.current = true;

    return true;
  };

  const rangeSelectToFirst = (event: React.SyntheticEvent, id: string) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;

    return selectRange(event, {
      start,
      end: getFirstNode(),
    });
  };

  const rangeSelectToLast = (event: React.SyntheticEvent, id: string) => {
    if (!lastSelectedNode.current) {
      lastSelectedNode.current = id;
    }

    const start = lastSelectionWasRange.current ? lastSelectedNode.current : id;

    return selectRange(event, {
      start,
      end: getLastNode(),
    });
  };

  const selectNextNode = (event: React.SyntheticEvent, id: string) =>
    selectRange(
      event,
      {
        end: getNextNode(id),
        current: id,
      },
      true,
    );

  const selectPreviousNode = (event: React.SyntheticEvent, id: string) =>
    selectRange(
      event,
      {
        end: getPreviousNode(id),
        current: id,
      },
      true,
    );

  const selectAllNodes = (event: React.SyntheticEvent) =>
    selectRange(event, { start: getFirstNode(), end: getLastNode() });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    let flag = false;
    const { key } = event;

    if (event.altKey || !focused) {
      return;
    }

    const ctrlPressed = event.ctrlKey || event.metaKey;

    switch (key) {
      case ' ':
        if (nodeMap.current.get(focused)?.expandable) {
          toggleExpansion(event);
          flag = true;
        }
        event.stopPropagation();
        break;
      case 'Enter':
        if (multiSelect && event.shiftKey) {
          flag = selectRange(event, { end: focused });
        } else if (multiSelect && event.ctrlKey) {
          flag = selectNode(focused, true);
        } else {
          flag = selectNode(focused);
        }

        event.stopPropagation();
        break;
      case 'ArrowDown':
        if (multiSelect && event.shiftKey) {
          selectNextNode(event, focused);
        }
        focusNextNode(focused);
        flag = true;
        break;
      case 'ArrowUp':
        if (multiSelect && event.shiftKey) {
          selectPreviousNode(event, focused);
        }
        focusPreviousNode(focused);
        flag = true;
        break;
      case 'Home':
        if (multiSelect && ctrlPressed && event.shiftKey) {
          rangeSelectToFirst(event, focused);
        }
        focusFirstNode();
        flag = true;
        break;
      case 'End':
        if (multiSelect && ctrlPressed && event.shiftKey) {
          rangeSelectToLast(event, focused);
        }
        focusLastNode();
        flag = true;
        break;
      default:
        if (key === '*') {
          expandAllSiblings(event, focused);
          flag = true;
        } else if (multiSelect && ctrlPressed && key.toLowerCase() === 'a') {
          flag = selectAllNodes(event);
        }
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  /*
   * Drop and Drag
   */

  const dropToSelected = useCallback(
    (targetId: string) => {
      onDrop(selected, targetId);
    },
    [onDrop, selected],
  );

  const [, dropRef] = useDrop({
    accept: ItemTypes.TreeItem,
    canDrop: (item, monitor) => {
      return monitor.isOver({ shallow: true });
    },
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        dropToSelected('');
      }
    },
  });

  /*
   * Mapping Helpers
   */

  const addNodeToNodeMap = (
    id: string,
    childrenIds: string[],
    expandable: boolean,
  ) => {
    const currentMap = nodeMap.current.get(id);
    nodeMap.current.set(id, {
      parent: currentMap?.parent,
      children: childrenIds,
      expandable,
    });

    childrenIds.forEach(childId => {
      const currentChildMap = nodeMap.current.get(childId);
      nodeMap.current.set(childId, {
        parent: id,
        children: currentChildMap ? currentChildMap.children : [],
        expandable: currentChildMap ? currentChildMap.expandable : false,
      });
    });
  };

  const getNodesToRemove = useCallback((id: string) => {
    const map = nodeMap.current.get(id);
    const nodes: string[] = [];
    if (map) {
      nodes.push(id);
      if (map.children) {
        nodes.concat(map.children);
        map.children.forEach(node => {
          nodes.concat(getNodesToRemove(node));
        });
      }
    }

    return nodes;
  }, []);

  const removeNodeFromNodeMap = useCallback(
    (id: string) => {
      const nodes = getNodesToRemove(id);
      const newMap = new Map(nodeMap.current);

      nodes.forEach(node => {
        const map = newMap.get(node);
        if (map) {
          if (map.parent) {
            const parentMap = newMap.get(map.parent);
            if (parentMap && parentMap.children) {
              const parentChildren = parentMap.children.filter(c => c !== node);
              newMap.set(map.parent, {
                parent: parentMap.parent,
                children: parentChildren,
                expandable: parentMap.expandable,
              });
            }
          }

          newMap.delete(node);
        }
      });
      nodeMap.current = newMap;
    },
    [getNodesToRemove],
  );

  const handleClick = () => {
    if (!disableSelection) {
      selectNode(null);
    }

    const element = document.activeElement;
    if (focused && element instanceof HTMLElement) {
      element.blur();
      setFocused(null);
    }
  };

  const prevChildIds = useRef<string[]>([]);
  const [childrenCalculated, setChildrenCalculated] = useState(false);
  useEffect(() => {
    const childIds: string[] = [];

    Children.forEach(children, child => {
      if (isValidElement(child) && child.props.nodeId) {
        childIds.push(child.props.nodeId);
      }
    });
    if (arrayDiff(prevChildIds.current, childIds)) {
      nodeMap.current.set('-1', {
        parent: null,
        children: childIds,
        expandable: false,
      });

      const top = nodeMap.current.get('1');
      visibleNodes.current = top ? top.children : [];
      prevChildIds.current = childIds;
      setChildrenCalculated(true);
    }
  }, [children]);

  useEffect(() => {
    const buildVisible = (nodes: string[]) => {
      let list: string[] = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const item = nodes[i];
        list.push(item);
        const node = nodeMap.current.get(item);
        const childs = node ? node.children : [];
        if (isExpanded(item) && childs) {
          list = list.concat(buildVisible(childs));
        }
      }

      return list;
    };

    if (childrenCalculated) {
      const top = nodeMap.current.get('-1');
      visibleNodes.current = top ? buildVisible(top.children) : [];
    }
  }, [expanded, childrenCalculated, isExpanded, children]);

  const [removedNodes, setRemovedNodes] = useState<string[]>([]);
  const setRemovedNode = useCallback((id: string) => {
    setRemovedNodes(nodes => [...nodes, id]);
  }, []);

  // 削除されたノードの後処理
  useEffect(() => {
    if (removedNodes.length !== 0) {
      // 選択状態から外す
      if (onNodeSelect) {
        const newSelected = selected.filter(id => !removedNodes.includes(id));
        onNodeSelect(newSelected);
      }

      // フォーカスの状態を外す
      if (focused && removedNodes.includes(focused)) {
        setFocused(null);
      }

      // 最後のフォーカスの状態を外す
      if (lastFocused) {
        setLastFocused(null);
      }

      setRemovedNodes([]);
    }
  }, [focused, lastFocused, onNodeSelect, removedNodes, selected, setFocused]);

  const noopSelection = () => {
    return false;
  };

  return (
    <TreeViewContext.Provider
      value={{
        focusedId: focused,
        lastFocusedId: lastFocused,
        focus,
        unFocus,
        focusFirstNode,
        focusLastNode,
        focusNextNode,
        focusPreviousNode,
        expandAllSiblings,
        toggleExpansion,
        isExpanded,
        isFocused,
        isLastFocused,
        isSelected,
        isDescendantOfSelected,
        selectNode: disableSelection ? noopSelection : selectNode,
        selectRange: disableSelection ? noopSelection : selectRange,
        selectNextNode: disableSelection ? noopSelection : selectNextNode,
        selectPreviousNode: disableSelection
          ? noopSelection
          : selectPreviousNode,
        rangeSelectToFirst: disableSelection
          ? noopSelection
          : rangeSelectToFirst,
        rangeSelectToLast: disableSelection ? noopSelection : rangeSelectToLast,
        selectAllNodes: disableSelection ? noopSelection : selectAllNodes,
        multiSelect,
        getParent,
        addNodeToNodeMap,
        removeNodeFromNodeMap,
        setRemovedNode,
        draggable,
        dropToSelected,
      }}
    >
      <div
        className={classes.doropLayer}
        ref={dropRef}
        role="none"
        onMouseDown={e => e.preventDefault()}
      >
        <ul
          tabIndex={-1}
          role="tree"
          aria-multiselectable={multiSelect}
          className={clsx(classes.root, className)}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          ref={ref}
        >
          {children}
        </ul>
      </div>
    </TreeViewContext.Provider>
  );
});

export const TreeView = withStyles(styles, { name: 'MuiTreeView' })(Component);
