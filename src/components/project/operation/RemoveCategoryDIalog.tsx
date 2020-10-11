import React from 'react';
import {
  SvgIconProps,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from '@material-ui/core';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import { useCategoriesContext } from '../../../context/CategoriesContext';
import { OperationDialog } from './OperationDialog';

type RemoveCategoryDialogProps = {
  disabled?: boolean;
  targetCategoryIds: string[];
  size?: SvgIconProps['fontSize'];
};

const RemoveCategoryDialog: React.FC<RemoveCategoryDialogProps> = ({
  disabled,
  targetCategoryIds,
  size,
}) => {
  const { removeCategories } = useCategoriesContext();

  const remove = () => {
    removeCategories(targetCategoryIds);
  };

  return (
    <OperationDialog
      tooltipText="カテゴリーを削除"
      activatorIcon={<DeleteCategoryIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="削除"
      onDone={remove}
      data-testid="removeCategoryDialog"
    >
      <DialogTitle>カテゴリーの削除</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか？
        </DialogContentText>
      </DialogContent>
    </OperationDialog>
  );
};

export { RemoveCategoryDialog };