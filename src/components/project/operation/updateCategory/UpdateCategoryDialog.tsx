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
  defaultField?: CategoryField;
  onUpdateCategory: (field: CategoryField) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultField,
  onUpdateCategory,
}) => {
  const formId = 'updateCategoryForm';

  return (
    <OperationDialog open={isOpen} onClose={onClose}>
      <DialogTitle>カテゴリーの編集</DialogTitle>

      <DialogContent>
        <CategoryForm
          id={formId}
          defaultField={defaultField}
          onSubmit={onUpdateCategory}
        />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="変更" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const UpdateCategoryDialog = Component;
