import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import AddCategoryIcon from '@material-ui/icons/CreateNewFolder';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { CategoryField } from '../../../../services/categories';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { AddCategoryDialog } from './AddCategoryDialog';

type Props = {
  disabled?: boolean;
  parentCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, parentCategoryId, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const { addCategory } = useCategoriesContext();

  const handleAddCategory = (field: CategoryField) => {
    addCategory(parentCategoryId, field);
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="カテゴリーの追加"
        onClick={open}
      >
        <AddCategoryIcon fontSize={size} />
      </ActivatorButton>

      <AddCategoryDialog
        isOpen={isOpen}
        onClose={close}
        onAddCategory={handleAddCategory}
      />
    </>
  );
};

export const AddCategoryButton = Component;
