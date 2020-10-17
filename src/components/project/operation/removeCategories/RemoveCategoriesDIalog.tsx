import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { OperationDialog } from '../OperationDialog';
import { RemoveCategoriesDialogContent } from './RemoveCategoriesDialogContent';

type RemoveCategoriesDialogProps = {
  disabled?: boolean;
  targetCategoryIds: string[];
  size?: SvgIconProps['fontSize'];
};

const RemoveCategoriesDialog: React.FC<RemoveCategoriesDialogProps> = ({
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
      title="カテゴリーの削除"
      activatorIcon={<DeleteCategoryIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="削除"
      onDone={remove}
      data-testid="removeCategoryDialog"
    >
      <RemoveCategoriesDialogContent />
    </OperationDialog>
  );
};

export { RemoveCategoriesDialog };
