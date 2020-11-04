import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Category } from '../../../../services/categories';
import { CategoryTreeList } from '../../ui/CategoryTreeList';
import { OperationDialog } from '../OperationDialog';

type Props = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategoryId: string;
  selectCategoryIdInternal: (ids: string[]) => void;
  onSelectCategory: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  onClose,
  categories,
  selectedCategoryId,
  selectCategoryIdInternal,
  onSelectCategory,
  onCancel,
}) => {
  return (
    <OperationDialog open={isOpen} onClose={onClose} className={className}>
      <DialogTitle>検索するカテゴリーの選択</DialogTitle>
      <DialogContent>
        <CategoryTreeList
          className="categoryTreeList"
          categories={categories}
          selectedCategoryIds={[selectedCategoryId]}
          onCategorySelect={selectCategoryIdInternal}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onSelectCategory} data-testid="doneButton">
          <Typography color="textSecondary">選択</Typography>
        </Button>
        <Button onClick={onCancel} data-testid="cancelButton">
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

const StyledComponent = styled(Component)`
  & .categoryTreeList {
    height: 50vh;
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

export const SelectCategoryDialog = StyledComponent;
