import React, {
  useContext,
  useEffect,
  useMemo,
  ReactNode,
  useRef,
} from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SvgIcon, Typography } from '@material-ui/core';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';
import TreeViewContext from './TreeViewContext';
import { ItemTypes } from '../ItemTypes';

const TreeItemRoot = styled.ul`
  list-style: none;
  padding-inline-start: 10px;
`;

const ExternalDropLayer = styled.div<{
  canDrop?: boolean;
  isDropOver?: boolean;
}>`
  background-color: ${props =>
    props.canDrop && props.isDropOver
      ? props.theme.palette.secondary.main
      : ''};
`;

const TreeItemDropLayer = styled.div<{
  canDrop?: boolean;
  isDropOver?: boolean;
}>`
  background-color: ${props =>
    props.canDrop && props.isDropOver
      ? props.theme.palette.secondary.main
      : ''};
`;

const TreeItemDragLayer = styled.div<{ isDragging?: boolean }>`
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
`;

const TreeItemContentRoot = styled.div<{ isDragging?: boolean }>`
  &:hover,
  &:focus {
    outline: none;
    background-color: ${props => props.theme.palette.action.hover};
  }
`;

const TreeItemContent = styled.div<{ selected?: boolean }>`
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: ${props =>
    props.selected && props.theme.palette.action.selected};
`;

const TreeItemGroup = styled.li`
  list-style: none;
  padding-inline-start: 10px;
`;

interface TreeItemProps {
  label: string;
  nodeId: string;
  canDrop?: boolean;
  isDropOver?: boolean;
}

const TreeItem: React.FC<TreeItemProps> = ({
  children,
  label,
  nodeId,
  isDropOver = false,
  canDrop = false,
}) => {
  const {
    multiple,
    nodes,
    addNodeId,
    addNodeChildrenId,
    removeNodeId,
    selectedIds,
    selectIds,
    setExpanded,
    isDrag,
    onDrop,
  } = useContext(TreeViewContext);

  const prevChildCount = useRef<number>(React.Children.count(children));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addNodeId(nodeId);

    return () => {
      removeNodeId(nodeId);
    };
  }, [addNodeId, nodeId, removeNodeId]);

  useEffect(() => {
    const getAllChildrenId = (childrenNode: React.ReactNode) => {
      const childrenId: string[] = [];
      React.Children.forEach(childrenNode, child => {
        if (React.isValidElement(child)) {
          if (child.props.nodeId) {
            childrenId.push(child.props.nodeId);
          }
          if (child.props.children) {
            childrenId.push(...getAllChildrenId(child.props.children));
          }
        }
      });

      return childrenId;
    };

    addNodeChildrenId(nodeId, getAllChildrenId(children));

    // 子ノードが追加されていたら、展開する
    const childrenCount = React.Children.count(children);
    if (childrenCount > prevChildCount.current) {
      setExpanded(nodeId, true);
      prevChildCount.current = childrenCount;
    }
  }, [addNodeChildrenId, children, nodeId, setExpanded]);

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.TreeItem },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: () => {
      if (!selectedIds.includes(nodeId)) {
        selectIds([nodeId]);
      }
    },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        selectIds([]);
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
      const isChild = selectedIds.some(parentId => {
        const parentWithChild = nodes.find(node => node.id === parentId);
        if (!parentWithChild) {
          throw new Error('存在しないジャンル');
        }

        return parentWithChild.childrenId.includes(nodeId);
      });

      return !isDragging && !selectedIds.includes(nodeId) && !isChild;
    },
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(selectedIds, nodeId);
      }
    },
  });

  const expandable = Boolean(
    Array.isArray(children) ? children.length : children,
  );

  const expanded: boolean = useMemo(() => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      return node.expanded;
    }

    return false;
  }, [nodeId, nodes]);

  const select = (isMulti: boolean) => {
    if (isMulti) {
      selectIds([...selectedIds, nodeId]);
    } else {
      selectIds([nodeId]);
    }
  };

  const deselect = (isMulti: boolean) => {
    if (isMulti) {
      selectIds(selectedIds.filter(id => id !== nodeId));
    } else {
      selectIds([]);
    }
  };

  const setSelectedIds = (isMulti: boolean) => {
    const isMultiple = multiple && isMulti;

    if (selectedIds.includes(nodeId)) {
      deselect(isMultiple);
    } else {
      select(isMultiple);
    }
  };

  const onClickNode = (event: React.MouseEvent<{}>) => {
    event.stopPropagation();
    if (selectedIds.includes(nodeId) && ref.current) {
      ref.current.blur();
    }

    setSelectedIds(event.ctrlKey);
  };

  const expand = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    if (expandable) {
      setExpanded(nodeId, !expanded);
    }
  };

  const icon = () => {
    if (!expandable) return <></>;

    if (expanded) {
      return <ExpandMoreIcon color="secondary" />;
    }

    return <ChevronRightIcon color="secondary" />;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      setSelectedIds(event.ctrlKey);
    } else if (event.key === ' ') {
      event.stopPropagation();
      if (expandable) {
        setExpanded(nodeId, !expanded);
      }
    }
  };

  return (
    <TreeItemRoot>
      <ExternalDropLayer isDropOver={isDropOver} canDrop={canDrop}>
        <TreeItemDropLayer
          ref={drop}
          isDropOver={isDropOverInner}
          canDrop={canDropInner}
          data-testid={`dropLayer-${nodeId}`}
        >
          <TreeItemDragLayer
            ref={isDrag ? drag : null}
            isDragging={isDragging}
            data-testid={`dragLayer-${nodeId}`}
          >
            <TreeItemContentRoot
              ref={ref}
              tabIndex={0}
              onKeyDown={handleKeyDown}
            >
              <TreeItemContent
                onClick={onClickNode}
                selected={selectedIds.includes(nodeId)}
                data-testid={`clickLayer-${nodeId}`}
              >
                <SvgIcon focusable onClick={expand} fontSize="large">
                  {icon()}
                </SvgIcon>
                <Typography>{label}</Typography>
              </TreeItemContent>
            </TreeItemContentRoot>
            <DragPreviewImage
              connect={preview}
              src={`${process.env.PUBLIC_URL}/folder.svg`}
            />
          </TreeItemDragLayer>
        </TreeItemDropLayer>
      </ExternalDropLayer>
      <TreeItemGroup hidden={!expanded}>{children}</TreeItemGroup>
    </TreeItemRoot>
  );
};

export default TreeItem;
