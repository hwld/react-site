import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { OperationDialog } from '../OperationDialog';
import { RemoveCategoriesDialogContent } from './RemoveCategoriesDialogContent';
import { IconButton } from '../../../ui/IconButton';

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
  const [isOpen, setIsOpen] = useState(false);
  const { removeCategories } = useCategoriesContext();

  const remove = () => {
    removeCategories(targetCategoryIds);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  return (
    <OperationDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="カテゴリーの削除"
      activator={
        <IconButton
          disabled={disabled}
          tooltipText="カテゴリーの削除"
          onClick={handleClick}
          data-testid="activatorButton"
        >
          <DeleteCategoryIcon fontSize={size} />
        </IconButton>
      }
      doneText="削除"
      onDone={remove}
      data-testid="removeCategoryDialog"
    >
      <RemoveCategoriesDialogContent />
    </OperationDialog>
  );
};

export { RemoveCategoriesDialog };
