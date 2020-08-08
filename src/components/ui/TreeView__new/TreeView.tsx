import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useControlled } from '@material-ui/core/utils';
import { WithStyles } from '@material-ui/styles';
import clsx from 'clsx';
import TreeViewContext from './TreeViewContext';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
};

function arrayDiff<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) return true;

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) return true;
  }

  return false;
}

type TreeViewProps = WithStyles<typeof styles> & {
  className?: string;
  defaultExpanded?: string[];
  defaultSelected?: string[];
  disableSelection?: boolean;
  multiSelect?: boolean;
  expanded?: string[];
  onNodeSelect?: (event: React.SyntheticEvent, ids: string[]) => void;
  selected?: string[];
  draggable?: boolean;
  onDrop?: (sourceId: string[], targetId: string) => void;
};

const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  function TreeView(props, ref) {
    const {
      children,
      className,
      classes,
      defaultExpanded = [],
      defaultSelected = [],
      disableSelection = false,
      multiSelect = false,
      expanded: expandedProp,
      onNodeSelect,
      selected: selectedProp,
      ...other
    } = props;
    const [tabbable, setTabbable] = React.useState<string | null>(null);
    const [focusedNodeId, setFocusedNodeId] = React.useState<string | null>(
      null,
    );

    const nodeMap = React.useRef(
      new Map<string, { parent?: string | null; children: string[] }>(),
    );

    const visibleNodes = React.useRef<string[]>([]);

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
     * Status Helpers
     */
    const isExpanded = React.useCallback(
      (id: string) =>
        Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false,
      [expanded],
    );

    const isSelected = React.useCallback(
      (id: string) =>
        Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id,
      [selected],
    );

    const isTabbable = (id: string) => tabbable === id;
    const isFocused = (id: string) => focusedNodeId === id;

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

    /*
     * Focus Helpers
     */

    const focus = (id: string | null) => {
      if (id) {
        setTabbable(id);
        setFocusedNodeId(id);
      }
    };

    const focusNextNode = (id: string) => focus(getNextNode(id));
    const focusPreviousNode = (id: string) => focus(getPreviousNode(id));
    const focusFirstNode = () => focus(getFirstNode());
    const focusLastNode = () => focus(getLastNode());

    /*
     * Expansion Helpers
     */

    const toggleExpansion = (
      event: React.SyntheticEvent,
      value = focusedNodeId,
    ) => {
      if (value !== null) {
        let newExpanded;
        if (expanded.indexOf(value) !== -1) {
          newExpanded = expanded.filter(id => id !== value);
          setTabbable(oldTabbable => {
            let map;
            if (oldTabbable) {
              map = nodeMap.current.get(oldTabbable);
            }
            if (
              oldTabbable &&
              (map && map.parent ? map.parent : null) === value
            ) {
              return value;
            }

            return oldTabbable;
          });
        } else {
          newExpanded = [value].concat(expanded);
        }

        setExpandedState(newExpanded);
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

    const lastSelectedNode = React.useRef<string | null>(null);
    const lastSelectionWasRange = React.useRef(false);
    const currentRangeSelection = React.useRef<string[]>([]);

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
        onNodeSelect(event, base);
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
      newSelected = newSelected.filter(
        (id, i) => newSelected.indexOf(id) === i,
      );

      if (onNodeSelect) {
        onNodeSelect(event, newSelected);
      }

      setSelectedState(newSelected);
    };

    const handleMultipleSelect = (
      event: React.SyntheticEvent,
      value: string,
    ) => {
      let newSelected: string[] = [];
      if (selected.indexOf(value) !== -1) {
        newSelected = selected.filter(id => id !== value);
      } else {
        newSelected = [value].concat(selected);
      }

      if (onNodeSelect) {
        onNodeSelect(event, newSelected);
      }

      setSelectedState(newSelected);
    };

    const handleSingleSelect = (event: React.SyntheticEvent, value: string) => {
      const newSelected = [value];

      if (onNodeSelect) {
        onNodeSelect(event, newSelected);
      }

      setSelectedState(newSelected);
    };

    const selectNode = (
      event: React.SyntheticEvent,
      id: string,
      multiple = false,
    ) => {
      if (id) {
        if (multiple) {
          handleMultipleSelect(event, id);
        } else {
          handleSingleSelect(event, id);
        }
        lastSelectedNode.current = id;
        lastSelectionWasRange.current = false;
        currentRangeSelection.current = [];

        return true;
      }

      return false;
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

      const start = lastSelectionWasRange.current
        ? lastSelectedNode.current
        : id;

      return selectRange(event, {
        start,
        end: getFirstNode(),
      });
    };

    const rangeSelectToLast = (event: React.SyntheticEvent, id: string) => {
      if (!lastSelectedNode.current) {
        lastSelectedNode.current = id;
      }

      const start = lastSelectionWasRange.current
        ? lastSelectedNode.current
        : id;

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

    /*
     * Mapping Helpers
     */

    const addNodeToNodeMap = (id: string, childrenIds: string[]) => {
      const currentMap = nodeMap.current.get(id);
      nodeMap.current.set(id, {
        parent: currentMap?.parent,
        children: childrenIds,
      });

      childrenIds.forEach(childId => {
        const currentChildMap = nodeMap.current.get(childId);
        nodeMap.current.set(childId, {
          parent: id,
          children: currentChildMap ? currentChildMap.children : [],
        });
      });
    };

    const getNodesToRemove = React.useCallback((id: string) => {
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

    const removeNodeFromNodeMap = React.useCallback(
      (id: string) => {
        const nodes = getNodesToRemove(id);
        const newMap = new Map(nodeMap.current);

        nodes.forEach(node => {
          const map = newMap.get(node);
          if (map) {
            if (map.parent) {
              const parentMap = newMap.get(map.parent);
              if (parentMap && parentMap.children) {
                const parentChildren = parentMap.children.filter(
                  c => c !== node,
                );
                newMap.set(map.parent, {
                  parent: parentMap.parent,
                  children: parentChildren,
                });
              }
            }

            newMap.delete(node);
          }
        });
        nodeMap.current = newMap;

        setFocusedNodeId(oldFocusedNodeId => {
          if (oldFocusedNodeId === id) {
            return null;
          }

          return oldFocusedNodeId;
        });
      },
      [getNodesToRemove],
    );

    const prevChildIds = React.useRef<string[]>([]);
    const [childrenCalculated, setChildrenCalculated] = React.useState(false);
    React.useEffect(() => {
      const childIds: string[] = [];

      React.Children.forEach(children, child => {
        if (React.isValidElement(child) && child.props.nodeId) {
          childIds.push(child.props.nodeId);
        }
      });
      if (arrayDiff(prevChildIds.current, childIds)) {
        nodeMap.current.set('-1', { parent: null, children: childIds });

        childIds.forEach((id, index) => {
          if (index === 0) {
            setTabbable(id);
          }
        });
        const top = nodeMap.current.get('1');
        visibleNodes.current = top ? top.children : [];
        prevChildIds.current = childIds;
        setChildrenCalculated(true);
      }
    }, [children]);

    React.useEffect(() => {
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

    const noopSelection = () => {
      return false;
    };

    return (
      <TreeViewContext.Provider
        value={{
          focus,
          focusFirstNode,
          focusLastNode,
          focusNextNode,
          focusPreviousNode,
          expandAllSiblings,
          toggleExpansion,
          isExpanded,
          isFocused,
          isSelected,
          selectNode: disableSelection ? noopSelection : selectNode,
          selectRange: disableSelection ? noopSelection : selectRange,
          selectNextNode: disableSelection ? noopSelection : selectNextNode,
          selectPreviousNode: disableSelection
            ? noopSelection
            : selectPreviousNode,
          rangeSelectToFirst: disableSelection
            ? noopSelection
            : rangeSelectToFirst,
          rangeSelectToLast: disableSelection
            ? noopSelection
            : rangeSelectToLast,
          selectAllNodes: disableSelection ? noopSelection : selectAllNodes,
          isTabbable,
          multiSelect,
          getParent,
          addNodeToNodeMap,
          removeNodeFromNodeMap,
        }}
      >
        <ul
          role="tree"
          aria-multiselectable={multiSelect}
          className={clsx(classes.root, className)}
          ref={ref}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...other}
        >
          {children}
        </ul>
      </TreeViewContext.Provider>
    );
  },
);

export default withStyles(styles, { name: 'MuiTreeView' })(TreeView);
