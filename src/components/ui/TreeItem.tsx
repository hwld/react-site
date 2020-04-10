import React, { useState, useContext, useEffect } from 'react';
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
  :hover {
    background-color: ${props => props.theme.palette.action.hover};
  }
`;

const TreeItemContent = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: left;
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
  const [expanded, setExpanded] = useState(false);
  const { selectedId, selectNode, setNodeId, unsetNodeId } = useContext(
    TreeViewContext,
  );

  useEffect(() => {
    if (setNodeId) setNodeId(nodeId);

    return () => {
      if (unsetNodeId) unsetNodeId(nodeId);
    };
  }, [nodeId, setNodeId, unsetNodeId]);

  const expandable = Boolean(
    Array.isArray(children) ? children.length : children,
  );

  const select = () => {
    if (selectNode) selectNode(nodeId);
  };

  const expand = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    if (expandable) {
      setExpanded(state => !state);
    }
  };

  const icon = () => {
    if (!expandable) return <></>;

    if (expanded) {
      return <ChevronRightIcon color="secondary" />;
    }

    return <ExpandMoreIcon color="secondary" />;
  };

  return (
    <TreeItemRoot>
      <TreeItemContentRoot>
        <TreeItemContent onClick={select} selected={nodeId === selectedId}>
          <SvgIcon focusable onClick={expand}>
            {icon()}
          </SvgIcon>
          <Typography>{label}</Typography>
        </TreeItemContent>
      </TreeItemContentRoot>
      <TreeItemGroup>{expanded ? children : null}</TreeItemGroup>
    </TreeItemRoot>
  );
};

export default TreeItem;
