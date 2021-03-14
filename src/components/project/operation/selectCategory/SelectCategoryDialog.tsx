import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { Category } from '../../../../services/categories';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { SelectCategoryForm } from '../../ui/SelectCategoryForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  className?: string;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  categories: Category[];
  defaultSelectedId: string;
  onSelectCategory: (id: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  isMobile,
  onClose,
  categories,
  defaultSelectedId,
  onSelectCategory,
}) => {
  const formId = 'selectCategoryForm';

  return (
    <OperationDialog
      open={isOpen}
      isMobile={isMobile}
      onClose={onClose}
      className={className}
    >
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
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="選択" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const SelectCategoryDialog = Component;
