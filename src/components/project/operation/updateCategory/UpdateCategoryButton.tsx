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

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    open();
  };

  const handleUpdateCategory = (field: CategoryField) => {
    if (defaultCategoryId) {
      updateCategory({ id: defaultCategoryId, ...field });
    }
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
        tooltipText="カテゴリーの編集"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <EditIcon fontSize={size} />
      </ActivatorButton>
      <UpdateCategoryDialog
        isOpen={isOpen}
        onClose={close}
        defaultCategory={defaultCategory}
        onUpdateCategory={handleUpdateCategory}
        onCancel={handleCancel}
      />
    </>
  );
};

export const UpdateCategoryButton = Component;
