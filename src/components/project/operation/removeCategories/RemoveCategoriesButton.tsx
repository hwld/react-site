import React from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { OperationDialog } from '../OperationDialog';
import { RemoveCategoriesDialogContent } from './RemoveCategoriesDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

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

  const handleDone = (event: React.SyntheticEvent) => {
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
      <OperationDialog
        open={isOpen}
        onClose={close}
        data-testid="removeCategoryDialog"
      >
        <DialogTitle>カテゴリーの削除</DialogTitle>
        <RemoveCategoriesDialogContent />
        <DialogActions>
          <Button onClick={handleDone} data-testid="doneButton">
            <Typography color="textSecondary">削除</Typography>
          </Button>
          <Button onClick={handleCancel} data-testid="cancelButton">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </OperationDialog>
    </>
  );
};

export const RemoveCategoriesButton = Component;
