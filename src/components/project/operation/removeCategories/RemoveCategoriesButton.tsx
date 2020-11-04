import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { RemoveCategoriesDialog } from './RemoveCategoriesDialog';

type Props = {
  disabled?: boolean;
  targetCategoryIds: string[];
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, targetCategoryIds, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const { removeCategories } = useCategoriesContext();

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    open();
  };

  const handleRemoveCategories = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    removeCategories(targetCategoryIds);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="カテゴリーの削除"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <DeleteCategoryIcon fontSize={size} />
      </ActivatorButton>
      <RemoveCategoriesDialog
        isOpen={isOpen}
        onClose={close}
        onRemoveCategories={handleRemoveCategories}
        onCancel={handleCancel}
      />
    </>
  );
};

export const RemoveCategoriesButton = Component;
