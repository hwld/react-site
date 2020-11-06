import React, { useMemo } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { CategoryField } from '../../../../services/categories';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { UpdateCategoryDialog } from './UpdateCategoryDialog';

type Props = {
  disabled?: boolean;
  defaultCategoryId?: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, defaultCategoryId, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const { categories, updateCategory } = useCategoriesContext();

  const defaultCategory = useMemo(() => {
    return categories.find(c => c.id === defaultCategoryId);
  }, [categories, defaultCategoryId]);

  const handleUpdateCategory = (field: CategoryField) => {
    if (defaultCategoryId) {
      updateCategory({ id: defaultCategoryId, ...field });
    }
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="カテゴリーの編集"
        onClick={open}
      >
        <EditIcon fontSize={size} />
      </ActivatorButton>
      <UpdateCategoryDialog
        isOpen={isOpen}
        onClose={close}
        defaultField={defaultCategory}
        onUpdateCategory={handleUpdateCategory}
      />
    </>
  );
};

export const UpdateCategoryButton = Component;
