import React, { useContext } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import GenresContext from '../../../context/GenresContext';
import OperationDialog from './OperationDialog';

interface RemoveGenreDialogProps {
  disabled?: boolean;
  targetGenreIds: string[];
  size?: SvgIconProps['fontSize'];
}

const RemoveGenreDialog: React.FC<RemoveGenreDialogProps> = ({
  disabled,
  targetGenreIds,
  size,
}) => {
  const { removeGenre } = useContext(GenresContext);

  const remove = () => {
    targetGenreIds.forEach(id => removeGenre(id));
  };

  return (
    <OperationDialog
      tooltipText="ジャンルを削除"
      activatorIcon={<DeleteGenreIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="削除"
      onDone={remove}
      data-testid="removeGenreDialog"
    >
      <DialogTitle>ジャンルの削除</DialogTitle>
      <DialogContent>削除してよろしいですか？</DialogContent>
    </OperationDialog>
  );
};

export default RemoveGenreDialog;
