import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import AddCategoryIcon from '@material-ui/icons/CreateNewFolder';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { CategoryField } from '../../../../services/categories';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { AddCategoryDialog } from './AddCategoryDialog';

type Props = {
  disabled?: boolean;
  parentCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, parentCategoryId, size }) => {
  const { isOpen, open, close } = useOpener(false);
  const { addCategory } = useCategoriesContext();

  const handleAddCategory = (field: CategoryField) => {
    addCategory(parentCategoryId, field);
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        aria-label="カテゴリー追加ダイアログを表示"
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

export const OpenAddCategoryDialogButton = Component;
