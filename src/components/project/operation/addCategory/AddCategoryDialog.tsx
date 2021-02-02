import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { CategoryField } from '../../../../services/categories';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { CategoryForm } from '../../ui/CategoryForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (field: CategoryField) => void;
};

const Component: React.FC<Props> = ({ isOpen, onClose, onAddCategory }) => {
  const formId = 'addCategoryForm';

  return (
    <OperationDialog open={isOpen} onClose={onClose}>
      <DialogTitle>カテゴリーの追加</DialogTitle>

      <DialogContent>
        <CategoryForm id={formId} onSubmit={onAddCategory} />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="追加" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const AddCategoryDialog = Component;
