import React, { useMemo } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { CategoryField } from '../../../../services/categories';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { UpdateCategoryDialog } from './UpdateCategoryDialog';
import { useAppStateContext } from '../../../../context/AppStateContext';

type Props = {
  disabled?: boolean;
  defaultCategoryId?: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, defaultCategoryId, size }) => {
  const { isOpen, open, close } = useOpener(false);
  const { categories, updateCategory } = useCategoriesContext();
  const { isMobile } = useAppStateContext();

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
        aria-label="カテゴリー編集ダイアログを表示"
        tooltipText="カテゴリーの編集"
        onClick={open}
      >
        <EditIcon fontSize={size} />
      </ActivatorButton>
      <UpdateCategoryDialog
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={close}
        defaultField={defaultCategory}
        onUpdateCategory={handleUpdateCategory}
      />
    </>
  );
};

export const OpenUpdateCategoryDialogButton = Component;
