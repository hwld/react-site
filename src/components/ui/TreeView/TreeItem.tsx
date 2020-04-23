import React, { useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SvgIcon, Typography } from '@material-ui/core';
import TreeViewContext from './TreeViewContext';

const TreeItemRoot = styled.ul`
  list-style: none;
  padding-inline-start: 10px;
`;

const TreeItemContentRoot = styled.div`
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
}

const TreeItem: React.FC<TreeItemProps> = ({ children, label, nodeId }) => {
  const {
    nodes,
    addNode,
    removeNode,
    selectedId,
    selectNode,
    expandNode,
  } = useContext(TreeViewContext);

  useEffect(() => {
    addNode(nodeId);

    return () => {
      removeNode(nodeId);
      // 選択状態のノードであれば、選択状態を解除する
      if (nodeId === selectedId) {
        selectNode('');
      }
    };
  }, [addNode, nodeId, removeNode, selectNode, selectedId]);

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

  const select = (event: React.MouseEvent<{}>) => {
    event.stopPropagation();
    selectNode(nodeId);
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
    window.console.log(event.key);
    if (event.key === 'Enter') {
      selectNode(nodeId);
    } else if (event.key === ' ') {
      event.stopPropagation();
      if (expandable) {
        expandNode(nodeId);
      }
    }
  };

  return (
    <TreeItemRoot>
      <TreeItemContentRoot tabIndex={0} onKeyDown={handleKeyDown}>
        <TreeItemContent onClick={select} selected={nodeId === selectedId}>
          <SvgIcon focusable onClick={expand} fontSize="large">
            {icon()}
          </SvgIcon>
          <Typography>{label}</Typography>
        </TreeItemContent>
      </TreeItemContentRoot>
      <TreeItemGroup hidden={!expanded}>{children}</TreeItemGroup>
    </TreeItemRoot>
  );
};

export default TreeItem;
