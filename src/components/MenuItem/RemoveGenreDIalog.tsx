import React from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import MenuItemDialog from './MenuItemDialog';

interface RemoveGenreDialogProps {
  remove: (id: string) => Promise<void>;
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const RemoveGenreDialog: React.FC<RemoveGenreDialogProps> = ({
  remove,
  selectedGenreId,
  size,
}) => {
  const removeGenre = () => {
    remove(selectedGenreId);
  };

  return (
    <>
      <MenuItemDialog
        tooltipText="ジャンルを削除"
        activatorIcon={<DeleteGenreIcon fontSize={size} />}
        activatorDisabled={selectedGenreId === ''}
        doneText="削除"
        onDone={removeGenre}
      >
        <DialogTitle>ジャンルの削除</DialogTitle>
        <DialogContent>削除してよろしいですか？</DialogContent>
      </MenuItemDialog>
    </>
  );
};

export default RemoveGenreDialog;
