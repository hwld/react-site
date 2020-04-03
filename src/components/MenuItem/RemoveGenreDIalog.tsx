import React from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import { useCurrentUserId } from 'services/auth';
import { useGenres } from 'services/storage/genres';
import MenuItemDialog from './MenuItemDialog';

interface RemoveGenreDialogProps {
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const RemoveGenreDialog: React.FC<RemoveGenreDialogProps> = ({
  selectedGenreId,
  size,
}) => {
  const { userId } = useCurrentUserId();
  const { removeGenre } = useGenres(userId);

  const remove = () => {
    removeGenre(selectedGenreId);
  };

  return (
    <MenuItemDialog
      tooltipText="ジャンルを削除"
      activatorIcon={<DeleteGenreIcon fontSize={size} />}
      activatorDisabled={selectedGenreId === ''}
      doneText="削除"
      onDone={remove}
    >
      <DialogTitle>ジャンルの削除</DialogTitle>
      <DialogContent>削除してよろしいですか？</DialogContent>
    </MenuItemDialog>
  );
};

export default RemoveGenreDialog;
