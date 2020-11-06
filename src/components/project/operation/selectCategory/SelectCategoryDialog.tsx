import {
  Button,
  DialogActions,
  DialogContent,
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
  defaultSelectedId: string;
  onSelectCategory: (id: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  onClose,
  categories,
  defaultSelectedId,
  onSelectCategory,
}) => {
  const formId = 'selectCategoryForm';

  return (
    <OperationDialog open={isOpen} onClose={onClose} className={className}>
      <DialogTitle>検索するカテゴリーの選択</DialogTitle>
      <DialogContent>
        <SelectCategoryForm
          categories={categories}
          defaultSelectedId={defaultSelectedId}
          id={formId}
          onSubmit={onSelectCategory}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit" form={formId}>
          <Typography color="textSecondary">選択</Typography>
        </Button>
        <Button onClick={onClose}>
          <Typography color="textSecondary">中止</Typography>
        </Button>
      </DialogActions>
    </OperationDialog>
  );
};

export const SelectCategoryDialog = Component;
