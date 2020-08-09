/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import {
  fade,
  withStyles,
  useTheme,
  Theme,
  WithStyles,
} from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';
import styled from 'styled-components';
import TreeViewContext from './TreeViewContext';
import { ItemTypes } from '../ItemTypes';

const DropLayer = styled.div<{
  canDrop?: boolean;
  isDropOver?: boolean;
}>`
  background-color: ${props =>
    props.canDrop && props.isDropOver
      ? props.theme.palette.secondary.main
      : ''};
`;

const DragLayer = styled.div<{ isDragging?: boolean }>`
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;

export const styles = (theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    WebkitTapHighlightColor: 'transparent',
    '&:focus > div > div > div > $content $label': {
      backgroundColor: theme.palette.action.hover,
    },
    '&$selected > div > div > div > $content $label': {
      backgroundColor: fade(
        theme.palette.secondary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
    '&$selected > div > div > div >  $content $label:hover, &$selected:focus > div > div > div > $content $label': {
      backgroundColor: fade(
        theme.palette.secondary.main,
        theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  /* Pseudo-class applied to the root element when expanded. */
  expanded: {},
  /* Pseudo-class applied to the root element when selected. */
  selected: {},
  /* Styles applied to the `role="group"` element. */
  group: {
    margin: 0,
    padding: 0,
    marginLeft: 17,
  },
  /* Styles applied to the tree node content. */
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  /* Styles applied to the tree node icon and collapse/expand icon. */
  iconContainer: {
    marginRight: 4,
    width: 30,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 30,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  /* Styles applied to the label element. */
  label: {
    width: '100%',
    paddingLeft: 4,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    // position: 'relative',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
});

type TreeItemProps = WithStyles<typeof styles> & {
  className?: string;
  label: string;
  nodeId: string;
  canDrop?: boolean;
  isDropOver?: boolean;
};

const UnStyledTreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  function TreeItem(props, ref) {
    const {
      children,
      className,
      classes,
      label,
      nodeId,
      isDropOver,
      canDrop,
    } = props;

    const {
      focus,
      focusFirstNode,
      focusLastNode,
      focusNextNode,
      focusPreviousNode,
      selectNode,
      selectRange,
      selectNextNode,
      selectPreviousNode,
      rangeSelectToFirst,
      rangeSelectToLast,
      selectAllNodes,
      expandAllSiblings,
      toggleExpansion,
      isExpanded,
      isFocused,
      isSelected,
      isDescendantOfSelected,
      isTabbable,
      multiSelect,
      getParent,
      addNodeToNodeMap,
      removeNodeFromNodeMap,
      setRemovedNode,
      draggable,
      dropToSelected,
    } = React.useContext(TreeViewContext);

    const nodeRef = React.useRef<HTMLLIElement>(null);
    const contentRef = React.useRef(null);
    const handleRef = useForkRef(nodeRef, ref);

    const expandable = Boolean(
      Array.isArray(children) ? children.length : children,
    );
    const expanded = isExpanded ? isExpanded(nodeId) : false;
    const focused = isFocused ? isFocused(nodeId) : false;
    const tabbable = isTabbable ? isTabbable(nodeId) : false;
    const selected = isSelected ? isSelected(nodeId) : false;
    const theme = useTheme();

    const icon = () => {
      if (!expandable) {
        return <></>;
      }
      if (!expanded) {
        return <ExpandMoreIcon color="secondary" />;
      }

      return <ChevronRightIcon color="secondary" />;
    };

    const handleContentClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      event.stopPropagation();

      if (!focused) {
        focus(nodeId);
      }

      const multiple =
        multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

      if (multiple) {
        if (event.shiftKey) {
          selectRange(event, { end: nodeId });
        } else {
          selectNode(nodeId, true);
        }
      } else {
        selectNode(nodeId);
      }
    };

    const handleIconClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      event.stopPropagation();

      const multiple =
        multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

      // If already expanded and trying to toggle selection don't close
      if (
        expandable &&
        !event.defaultPrevented &&
        !(multiple && isExpanded(nodeId))
      ) {
        toggleExpansion(event, nodeId);
      }
    };

    const handleMouseDown = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    const handleNextArrow = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (expandable) {
        if (expanded) {
          focusNextNode(nodeId);
        } else {
          toggleExpansion(event);
        }
      }

      return true;
    };

    const handlePreviousArrow = (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (expanded) {
        toggleExpansion(event, nodeId);

        return true;
      }

      const parent = getParent(nodeId);
      if (parent) {
        focus(parent);

        return true;
      }

      return false;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
      let flag = false;
      const { key } = event;

      if (event.altKey || event.currentTarget !== event.target) {
        return;
      }

      const ctrlPressed = event.ctrlKey || event.metaKey;

      switch (key) {
        case ' ':
          if (nodeRef.current === event.currentTarget && expandable) {
            toggleExpansion(event);
            flag = true;
          }
          event.stopPropagation();
          break;
        case 'Enter':
          if (nodeRef.current === event.currentTarget) {
            if (multiSelect && event.shiftKey) {
              flag = selectRange(event, { end: nodeId });
            } else if (multiSelect && event.ctrlKey) {
              flag = selectNode(nodeId, true);
            } else {
              flag = selectNode(nodeId);
            }
          }
          event.stopPropagation();
          break;
          if (nodeRef.current === event.currentTarget && expandable) {
            toggleExpansion(event);
            flag = true;
          }
          event.stopPropagation();
          break;
        case 'ArrowDown':
          if (multiSelect && event.shiftKey) {
            selectNextNode(event, nodeId);
          }
          focusNextNode(nodeId);
          flag = true;
          break;
        case 'ArrowUp':
          if (multiSelect && event.shiftKey) {
            selectPreviousNode(event, nodeId);
          }
          focusPreviousNode(nodeId);
          flag = true;
          break;
        case 'ArrowRight':
          if (theme.direction === 'rtl') {
            flag = handlePreviousArrow(event);
          } else {
            flag = handleNextArrow(event);
          }
          break;
        case 'ArrowLeft':
          if (theme.direction === 'rtl') {
            flag = handleNextArrow(event);
          } else {
            flag = handlePreviousArrow(event);
          }
          break;
        case 'Home':
          if (multiSelect && ctrlPressed && event.shiftKey) {
            rangeSelectToFirst(event, nodeId);
          }
          focusFirstNode();
          flag = true;
          break;
        case 'End':
          if (multiSelect && ctrlPressed && event.shiftKey) {
            rangeSelectToLast(event, nodeId);
          }
          focusLastNode();
          flag = true;
          break;
        default:
          if (key === '*') {
            expandAllSiblings(event, nodeId);
            flag = true;
          } else if (multiSelect && ctrlPressed && key.toLowerCase() === 'a') {
            flag = selectAllNodes(event);
          }
      }

      if (flag) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLLIElement>) => {
      if (!focused && event.currentTarget === event.target) {
        focus(nodeId);
      }
    };

    React.useEffect(() => {
      if (addNodeToNodeMap) {
        const childIds: string[] = [];
        React.Children.forEach(children, child => {
          if (React.isValidElement(child) && child.props.nodeId) {
            childIds.push(child.props.nodeId);
          }
        });
        addNodeToNodeMap(nodeId, childIds);
      }
    }, [children, nodeId, addNodeToNodeMap]);

    React.useEffect(() => {
      if (removeNodeFromNodeMap) {
        return () => {
          removeNodeFromNodeMap(nodeId);
          setRemovedNode(nodeId);
        };
      }

      return undefined;
    }, [nodeId, removeNodeFromNodeMap, setRemovedNode]);

    React.useEffect(() => {
      const reference = nodeRef.current;
      if (focused && reference) {
        reference.focus();
      }
    }, [focused]);

    let ariaSelected;
    if (multiSelect) {
      ariaSelected = selected;
    } else if (selected) {
      // single-selection trees unset aria-selected
      ariaSelected = true;
    }

    const [{ isDragging }, drag, preview] = useDrag({
      item: { type: ItemTypes.TreeItem },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
      begin: () => {
        if (!isSelected(nodeId)) {
          selectNode(nodeId);
        }
      },
      end: (item, monitor) => {
        if (monitor.didDrop()) {
          selectNode(null);
        }
      },
    });

    const [{ isDropOverInner, canDropInner }, drop] = useDrop({
      accept: ItemTypes.TreeItem,
      collect: monitor => ({
        isDropOverInner: monitor.isOver(),
        canDropInner: monitor.canDrop(),
      }),
      canDrop: () => {
        return (
          !isDragging && !isSelected(nodeId) && !isDescendantOfSelected(nodeId)
        );
      },
      drop: (item, monitor) => {
        if (!monitor.didDrop()) {
          dropToSelected(nodeId);
        }
      },
    });

    return (
      <li
        className={clsx(classes.root, className, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
        })}
        role="treeitem"
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        aria-expanded={expandable ? expanded : undefined}
        aria-selected={ariaSelected}
        ref={handleRef}
        tabIndex={tabbable ? 0 : -1}
      >
        <DropLayer isDropOver={isDropOver} canDrop={canDrop}>
          <DropLayer
            ref={drop}
            isDropOver={isDropOverInner}
            canDrop={canDropInner}
          >
            <DragLayer ref={draggable ? drag : null} isDragging={isDragging}>
              <div
                className={classes.content}
                onClick={handleContentClick}
                onMouseDown={handleMouseDown}
                ref={contentRef}
              >
                <div
                  onClick={handleIconClick}
                  className={classes.iconContainer}
                  // click時にfocusが外側のdivにつかないようにする.
                  tabIndex={-1}
                >
                  {icon()}
                </div>
                <Typography component="div" className={classes.label}>
                  {label}
                </Typography>
              </div>
              <DragPreviewImage
                connect={preview}
                src={`${process.env.PUBLIC_URL}/folder.svg`}
              />
            </DragLayer>
          </DropLayer>
        </DropLayer>
        {children && (
          <Collapse
            unmountOnExit
            className={classes.group}
            in={expanded}
            component="ul"
          >
            {children}
          </Collapse>
        )}
      </li>
    );
  },
);

export const TreeItem = withStyles(styles, { name: 'MuiTreeItem' })(
  UnStyledTreeItem,
);
