import React, { useContext } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import GenresContext from '../../context/GenresContext';
import OperationDialog from './OperationDialog';

interface RemoveGenreDialogProps {
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const RemoveGenreDialog: React.FC<RemoveGenreDialogProps> = ({
  selectedGenreId,
  size,
}) => {
  const { removeGenre } = useContext(GenresContext);

  const remove = () => {
    removeGenre(selectedGenreId);
  };

  return (
    <OperationDialog
      tooltipText="ジャンルを削除"
      activatorIcon={<DeleteGenreIcon fontSize={size} />}
      activatorDisabled={selectedGenreId === ''}
      doneText="削除"
      onDone={remove}
    >
      <DialogTitle>ジャンルの削除</DialogTitle>
      <DialogContent>削除してよろしいですか？</DialogContent>
    </OperationDialog>
  );
};

export default RemoveGenreDialog;
