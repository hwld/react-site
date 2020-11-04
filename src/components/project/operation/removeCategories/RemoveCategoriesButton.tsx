import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { OperationDialog } from '../OperationDialog';
import { RemoveCategoriesDialogContent } from './RemoveCategoriesDialogContent';
import { OperationIconButton } from '../OperationIconButton';

type Props = {
  disabled?: boolean;
  targetCategoryIds: string[];
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, targetCategoryIds, size }) => {
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
    <>
      <OperationIconButton
        disabled={disabled}
        tooltipText="カテゴリーの削除"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <DeleteCategoryIcon fontSize={size} />
      </OperationIconButton>
      <OperationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="カテゴリーの削除"
        doneText="削除"
        onDone={remove}
        data-testid="removeCategoryDialog"
      >
        <RemoveCategoriesDialogContent />
      </OperationDialog>
    </>
  );
};

export const RemoveCategoriesButton = Component;
