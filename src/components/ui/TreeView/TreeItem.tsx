/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { fade, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { useForkRef } from '@material-ui/core/utils';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import {
  useDrag,
  useDrop,
  DragPreviewImage,
  DragElementWrapper,
} from 'react-dnd';
import { TreeViewContext } from './TreeViewContext';
import { ItemTypes } from '../ItemTypes';

export const styles = (theme: Theme) => ({
  /* Styles applied to the root element. */
  root: {
    listStyle: 'none',
    margin: 1,
    padding: 0,
    outline: 0,
    WebkitTapHighlightColor: 'transparent',

    // , &$focused > div > div > div > $content $label
    '&$focused > div > div > div > $content $label': {
      backgroundColor: theme.palette.action.hover,
      outline: `1px solid ${theme.palette.secondary.main}`,
    },

    '&$selected > div > div > div > $content $label': {
      backgroundColor: fade(
        theme.palette.action.selected,
        theme.palette.action.selectedOpacity,
      ),
    },

    '&$selected > div > div > div >  $content $label:hover, &$selected:focus > div > div > div > $content $label': {
      backgroundColor: fade(
        theme.palette.action.selected,
        // 1を超えるとバグる
        theme.palette.action.selectedOpacity +
          theme.palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      // '@media (hover: none)': {
      //   backgroundColor: 'transparent',
      // },
    },
  },
  /* Pseudo-class applied to the root element when expanded. */
  expanded: {},
  /* Pseudo-class applied to the root element when selected. */
  selected: {},
  /* Pseudo-class applied to the root element when focused. */
  focused: {},

  /* ドロップレイヤーに適用されるスタイル */
  dropLayer: {
    '&$canDrop$isDropOver': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  /* ドラッグレイヤーに適用されるスタイル */
  dragLayer: {
    opacity: 1,
    '&$isDragging': {
      opacity: 0.5,
    },
  },
  /* ドロップ可能な要素に適用される疑似クラス */
  canDrop: {},
  /* ドロップオーバーされている要素に適用される擬似クラス */
  isDropOver: {},
  /* ドラッグされている要素に適用される疑似クラス */
  isDragging: {},

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
    fontSize: '1rem',
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
  dropRef?: DragElementWrapper<unknown>;
  canDrop?: boolean;
  isDropOver?: boolean;
  onKeyDown?: (event: React.KeyboardEvent) => void;
};

const UnStyledTreeItem = React.forwardRef<
  HTMLLIElement,
  React.PropsWithChildren<TreeItemProps>
>(function TreeItem(props, ref) {
  const {
    children,
    className,
    classes,
    label,
    nodeId,
    dropRef,
    isDropOver,
    canDrop,
  } = props;

  const {
    focus,
    selectNode,
    selectRange,
    toggleExpansion,
    isExpanded,
    isFocused,
    isSelected,
    isDescendantOfSelected,
    multiSelect,
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
  const selected = isSelected ? isSelected(nodeId) : false;

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
      addNodeToNodeMap(nodeId, childIds, expandable);
    }
  }, [children, nodeId, addNodeToNodeMap, expandable]);

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

  // TreeItemはTreeItemをドロップできるので、外側から受け取ったdropRefとは別の状態が必要になる.
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
        [classes.focused]: isFocused(nodeId),
      })}
      role="treeitem"
      onFocus={handleFocus}
      aria-expanded={expandable ? expanded : undefined}
      aria-selected={ariaSelected}
      ref={handleRef}
      tabIndex={-1}
    >
      <div
        className={clsx(classes.dropLayer, {
          [classes.isDropOver]: isDropOver,
          [classes.canDrop]: canDrop,
        })}
        ref={dropRef}
        data-testid={`outer-dropLayer-${nodeId}`}
      >
        <div
          className={clsx(classes.dropLayer, {
            [classes.isDropOver]: isDropOverInner,
            [classes.canDrop]: canDropInner,
          })}
          ref={drop}
          data-testid={`dropLayer-${nodeId}`}
        >
          <div
            className={clsx(classes.dragLayer, {
              [classes.isDragging]: isDragging,
            })}
            ref={draggable ? drag : null}
            data-testid={`dragLayer-${nodeId}`}
          >
            <div
              className={classes.content}
              onClick={handleContentClick}
              onMouseDown={handleMouseDown}
              ref={contentRef}
              data-testid={`clickLayer-${nodeId}`}
            >
              <div
                onClick={handleIconClick}
                className={classes.iconContainer}
                // click時にfocusが外側のdivにつかないようにする.
                tabIndex={-1}
                data-testid={`expandLayer-${nodeId}`}
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
          </div>
        </div>
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
});

export const TreeItem = withStyles(styles, { name: 'MuiTreeItem' })(
  UnStyledTreeItem,
);
