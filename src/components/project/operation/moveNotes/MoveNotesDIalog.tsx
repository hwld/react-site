import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
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
  destCategoryId: string;
  selectCategory: (ids: string[]) => void;
  onMove: (event: React.SyntheticEvent) => void;
  onCancel: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  onClose,
  categories,
  destCategoryId,
  selectCategory,
  onMove,
  onCancel,
}) => {
  return (
    <OperationDialog
      className={className}
      open={isOpen}
      onClose={onClose}
      data-testid="moveNotesDialog"
    >
      <DialogTitle>メモの移動</DialogTitle>

      <DialogContent>
        <DialogContentText color="textPrimary">
          移動先カテゴリー
        </DialogContentText>
        <CategoryTreeList
          className="categoryTreeList"
          categories={categories}
          selectedCategoryIds={[destCategoryId]}
          onCategorySelect={selectCategory}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onMove} data-testid="doneButton">
          <Typography color="textSecondary">移動</Typography>
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

export const MoveNotesDialog = StyledComponent;
