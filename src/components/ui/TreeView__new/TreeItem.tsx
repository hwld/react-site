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
import TreeViewContext from './TreeViewContext';

export const styles = (theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    outline: 0,
    WebkitTapHighlightColor: 'transparent',
    '&:focus > $content $label': {
      backgroundColor: theme.palette.action.hover,
    },
    '&$selected > $content $label': {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
    '&$selected > $content $label:hover, &$selected:focus > $content $label': {
      backgroundColor: fade(
        theme.palette.primary.main,
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
    width: 15,
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'center',
    '& svg': {
      fontSize: 18,
    },
  },
  /* Styles applied to the label element. */
  label: {
    width: '100%',
    paddingLeft: 4,
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

const TreeItem = React.forwardRef<HTMLLIElement, TreeItemProps>(
  function TreeItem(props, ref) {
    const { children, className, classes, label, nodeId, ...other } = props;

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
      isTabbable,
      multiSelect,
      getParent,
      addNodeToNodeMap,
      removeNodeFromNodeMap,
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
      if (!expanded) {
        return <ExpandMoreIcon color="secondary" />;
      }

      return <ChevronRightIcon color="secondary" />;
    };

    const handleClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
      if (!focused) {
        focus(nodeId);
      }

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

      if (multiple) {
        if (event.shiftKey) {
          selectRange(event, { end: nodeId });
        } else {
          selectNode(event, nodeId, true);
        }
      } else {
        selectNode(event, nodeId);
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
          if (nodeRef.current === event.currentTarget) {
            if (multiSelect && event.shiftKey) {
              flag = selectRange(event, { end: nodeId });
            } else if (multiSelect) {
              flag = selectNode(event, nodeId, true);
            } else {
              flag = selectNode(event, nodeId);
            }
          }
          event.stopPropagation();
          break;
        case 'Enter':
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
        };
      }

      return undefined;
    }, [nodeId, removeNodeFromNodeMap]);

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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
      >
        <div
          className={classes.content}
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          ref={contentRef}
        >
          <div onClick={() => {}} className={classes.iconContainer}>
            {icon()}
          </div>
          <Typography component="div" className={classes.label}>
            {label}
          </Typography>
        </div>
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

export default withStyles(styles, { name: 'MuiTreeItem' })(TreeItem);
