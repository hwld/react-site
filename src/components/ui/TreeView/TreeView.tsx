import React, { useState, useEffect, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import TreeViewContext, { TreeNode } from './TreeViewContext';

const Tree = styled.ul`
  list-style: none;
  padding-inline-start: 0;
  background-color: ${props => props.theme.palette.primary.main};
  margin-top: 0;
  margin-bottom: 0;
`;

interface TreeViewProps {
  className?: string;
  onNodeSelect?: (id: string) => void;
}

type TreeViewState = {
  nodes: TreeNode[];
  selectedId: string;
  selectedIdHistory: string;
};

type TreeViewAction =
  | { type: 'addNode'; id: string }
  | { type: 'removeNode'; id: string }
  | { type: 'selectNode'; id: string }
  | { type: 'expandNode'; id: string };

const TreeViewReducer: React.Reducer<TreeViewState, TreeViewAction> = (
  state: TreeViewState,
  action: TreeViewAction,
) => {
  switch (action.type) {
    case 'addNode': {
      return {
        ...state,
        nodes: [...state.nodes, { id: action.id, expanded: false }],
      };
    }
    case 'removeNode': {
      return {
        ...state,
        nodes: state.nodes.filter(node => node.id !== action.id),
      };
    }
    case 'selectNode': {
      const newState = {
        ...state,
        selectedId: action.id !== state.selectedId ? action.id : '',
      };
      window.console.log(newState);

      return newState;
    }
    case 'expandNode': {
      const newState = {
        ...state,
        nodes: state.nodes.map(
          (node): TreeNode => {
            if (node.id === action.id) {
              return { id: node.id, expanded: !node.expanded };
            }

            return node;
          },
        ),
      };
      window.console.log(newState);

      return newState;
    }
    default: {
      return state;
    }
  }
};

const TreeView: React.FC<TreeViewProps> = ({
  children,
  className,
  onNodeSelect,
}) => {
  const [{ nodes, selectedId }, dispatch] = useReducer(TreeViewReducer, {
    nodes: [],
    selectedId: '',
    selectedIdHistory: '',
  });

  const addNode = useCallback((id: string) => {
    dispatch({ type: 'addNode', id });
  }, []);

  const removeNode = useCallback((id: string) => {
    dispatch({ type: 'removeNode', id });
  }, []);

  const selectNode = useCallback(
    (id: string) => {
      dispatch({ type: 'selectNode', id });
      if (onNodeSelect) onNodeSelect(id);
    },
    [onNodeSelect],
  );

  const expandNode = useCallback((id: string) => {
    dispatch({ type: 'expandNode', id });
  }, []);

  return (
    <TreeViewContext.Provider
      value={{ nodes, addNode, removeNode, selectedId, selectNode, expandNode }}
    >
      <Tree
        onClick={() => {
          selectNode('');
        }}
        className={className}
      >
        {children}
      </Tree>
    </TreeViewContext.Provider>
  );
};

export default TreeView;
