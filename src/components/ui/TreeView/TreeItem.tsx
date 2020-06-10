import React, { useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SvgIcon, Typography } from '@material-ui/core';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';
import TreeViewContext from './TreeViewContext';
import { ItemTypes } from './ItemTypes';

const TreeItemRoot = styled.ul`
  list-style: none;
  padding-inline-start: 10px;
`;

const TreeItemDropLayer = styled.div<{ canDrop?: boolean; isOver?: boolean }>`
  background-color: ${props =>
    props.canDrop && props.isOver ? props.theme.palette.secondary.main : ''};
`;

const TreeItemContentRoot = styled.div<{ isDragging?: boolean }>`
  &:hover,
  &:focus {
    outline: none;
    background-color: ${props => props.theme.palette.action.hover};
  }
  opacity: ${props => (props.isDragging ? 0.5 : 1)};
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
}

const TreeItem: React.FC<TreeItemProps> = ({ children, label, nodeId }) => {
  const {
    multiple,
    nodes,
    addNodeId,
    removeNodeId,
    selectedIds,
    selectIds,
    expandNode,
    onDrop,
  } = useContext(TreeViewContext);

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.TreeItem },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: () => {
      if (!selectedIds.includes(nodeId)) {
        selectIds([...selectedIds, nodeId]);
      }
    },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        selectIds([]);
      }
    },
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.TreeItem,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: () => !isDragging && !selectedIds.includes(nodeId),
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(selectedIds, nodeId);
      }
    },
  });

  useEffect(() => {
    addNodeId(nodeId);

    return () => {
      removeNodeId(nodeId);
    };
  }, [addNodeId, nodeId, removeNodeId]);

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
    setSelectedIds(event.ctrlKey);
  };

  const expand = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    if (expandable) {
      expandNode(nodeId);
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
        expandNode(nodeId);
      }
    }
  };

  return (
    <TreeItemRoot>
      <TreeItemDropLayer ref={drop} isOver={isOver} canDrop={canDrop}>
        <TreeItemContentRoot
          ref={drag}
          isDragging={isDragging}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <TreeItemContent
            onClick={onClickNode}
            selected={selectedIds.includes(nodeId)}
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
      </TreeItemDropLayer>
      <TreeItemGroup hidden={!expanded}>{children}</TreeItemGroup>
    </TreeItemRoot>
  );
};

export default TreeItem;
