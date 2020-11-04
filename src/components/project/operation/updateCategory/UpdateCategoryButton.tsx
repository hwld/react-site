import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import {
  Category,
  CategoryField,
  getDefaultCategory,
} from '../../../../services/categories';
import { UpdateCategoryDialogContent } from './UpdateCategoryDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

type Props = {
  disabled?: boolean;
  defaultCategoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, defaultCategoryId, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const [newCategory, setNewCategory] = useState<Category>(
    getDefaultCategory(),
  );
  const { categories, updateCategory } = useCategoriesContext();

  const setDefaultCategory = () => {
    const defaultCategory = categories.find(
      category => category.id === defaultCategoryId,
    );
    if (!defaultCategory) {
      throw Error('存在しないカテゴリー');
    }
    setNewCategory(defaultCategory);
  };

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setDefaultCategory();
    open();
  };

  const handleDone = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    updateCategory(newCategory);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
  };

  const changeCategoryField = (
    fieldName: keyof CategoryField,
    value: string,
  ) => {
    setNewCategory(state => ({ ...state, [fieldName]: value }));
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
      <OperationDialog
        open={isOpen}
        onClose={close}
        data-testid="updateCategoryDialog"
      >
        <DialogTitle>カテゴリーの編集</DialogTitle>
        <UpdateCategoryDialogContent
          newCategoryField={newCategory}
          onChangeCategoryField={changeCategoryField}
        />
        <DialogActions>
          <Button
            onClick={handleDone}
            disabled={newCategory.categoryName === ''}
            data-testid="doneButton"
          >
            <Typography color="textSecondary">変更</Typography>
          </Button>
          <Button onClick={handleCancel} data-testid="cancelButton">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </OperationDialog>
    </>
  );
};

export const UpdateCategoryButton = Component;
