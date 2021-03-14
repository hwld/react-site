import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { RemoveCategoriesDialog } from './RemoveCategoriesDialog';
import { useAppStateContext } from '../../../../context/AppStateContext';

type Props = {
  disabled?: boolean;
  targetCategoryIds: string[];
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, targetCategoryIds, size }) => {
  const { isOpen, open, close } = useOpener(false);
  const { removeCategories } = useCategoriesContext();
  const { isMobile } = useAppStateContext();

  const handleRemoveCategories = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    removeCategories(targetCategoryIds);
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        aria-label="カテゴリー削除ダイアログを表示"
        tooltipText="カテゴリーの削除"
        onClick={open}
      >
        <DeleteCategoryIcon fontSize={size} />
      </ActivatorButton>
      <RemoveCategoriesDialog
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={close}
        onRemoveCategories={handleRemoveCategories}
      />
    </>
  );
};

export const OpenRemoveCategoriesDialogButton = Component;
