import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Category } from '../../../../services/categories';
import { SelectCategoryForm } from '../../ui/SelectCategoryForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onMove: (genreId: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  onClose,
  categories,
  onMove,
}) => {
  const formId = 'moveNotesForm';

  return (
    <OperationDialog className={className} open={isOpen} onClose={onClose}>
      <DialogTitle>メモの移動</DialogTitle>

      <DialogContent>
        <DialogContentText color="textPrimary">
          移動先カテゴリー
        </DialogContentText>
        <SelectCategoryForm
          id="moveNotesForm"
          categories={categories}
          onSubmit={onMove}
        />
      </DialogContent>

      <DialogActions>
        <Button type="submit" form={formId}>
          <Typography color="textSecondary">移動</Typography>
        </Button>
        <Button onClick={onClose}>
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const MoveNotesDialog = Component;
