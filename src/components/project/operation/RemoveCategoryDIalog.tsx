import React from 'react';
import {
  SvgIconProps,
  DialogTitle,
  DialogContentText,
  DialogContent,
} from '@material-ui/core';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import { useGenresContext } from '../../../context/CategoriesContext';
import { OperationDialog } from './OperationDialog';

type RemoveGenreDialogProps = {
  disabled?: boolean;
  targetGenreIds: string[];
  size?: SvgIconProps['fontSize'];
};

const RemoveGenreDialog: React.FC<RemoveGenreDialogProps> = ({
  disabled,
  targetGenreIds,
  size,
}) => {
  const { removeGenres } = useGenresContext();

  const remove = () => {
    removeGenres(targetGenreIds);
  };

  return (
    <OperationDialog
      tooltipText="カテゴリーを削除"
      activatorIcon={<DeleteGenreIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="削除"
      onDone={remove}
      data-testid="removeGenreDialog"
    >
      <DialogTitle>カテゴリーの削除</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか？
        </DialogContentText>
      </DialogContent>
    </OperationDialog>
  );
};

export { RemoveGenreDialog };
