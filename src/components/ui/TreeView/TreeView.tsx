import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useControlled } from '@material-ui/core/utils';
import { WithStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import { TreeViewContext } from './TreeViewContext';
import { ItemTypes } from '../ItemTypes';

const DropLayer = styled.div`
  height: 100%;
`;

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
  onNodeSelect?: (ids: string[]) => void;
  selected?: string[];
  draggable?: boolean;
  onDrop?: (sourceId: string[], targetId: string) => void;
};

const UnStyledTreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
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
      draggable = false,
      onDrop = () => {},
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

    const getAllDescendants = React.useCallback((id: string): string[] => {
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

    const isDescendantOfSelected = React.useCallback(
      (id: string) => {
        const descendantsOfSelected = selected.flatMap(selectedId =>
          getAllDescendants(selectedId),
        );

        return descendantsOfSelected.includes(id);
      },
      [getAllDescendants, selected],
    );

    const isTabbable = (id: string) => tabbable === id;
    const isFocused = (id: string) => focusedNodeId === id;

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
      newSelected = newSelected.filter(
        (id, i) => newSelected.indexOf(id) === i,
      );

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
     * Drop and Drag
     */

    const dropToSelected = React.useCallback(
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

    const [removedNodes, setRemovedNodes] = React.useState<string[]>([]);
    const setRemovedNode = React.useCallback((id: string) => {
      setRemovedNodes(nodes => [...nodes, id]);
    }, []);

    // 削除されたノードが選択状態のときに解除する
    React.useEffect(() => {
      if (onNodeSelect && removedNodes.length !== 0) {
        const newSelected = selected.filter(id => !removedNodes.includes(id));
        onNodeSelect(newSelected);
        setRemovedNodes([]);
      }
    }, [onNodeSelect, removedNodes, selected]);

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
          rangeSelectToLast: disableSelection
            ? noopSelection
            : rangeSelectToLast,
          selectAllNodes: disableSelection ? noopSelection : selectAllNodes,
          isTabbable,
          multiSelect,
          getParent,
          addNodeToNodeMap,
          removeNodeFromNodeMap,
          setRemovedNode,
          draggable,
          dropToSelected,
        }}
      >
        <DropLayer ref={dropRef}>
          <ul
            role="tree"
            aria-multiselectable={multiSelect}
            className={clsx(classes.root, className)}
            onClick={() => !disableSelection && selectNode(null)}
            onKeyDown={() => {}}
            ref={ref}
          >
            {children}
          </ul>
        </DropLayer>
      </TreeViewContext.Provider>
    );
  },
);

export const TreeView = withStyles(styles, { name: 'MuiTreeView' })(
  UnStyledTreeView,
);
