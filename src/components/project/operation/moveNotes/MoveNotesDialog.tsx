import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { Category } from '../../../../services/categories';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
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
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="移動" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const MoveNotesDialog = Component;
