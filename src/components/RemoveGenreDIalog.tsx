import React from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeGenre } from 'stores/store';
import DeleteGenreIcon from '@material-ui/icons/Delete';
import MenuItemDialog from './MenuItemDialog';

interface RemoveGenreDialogProps {
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const RemoveGenreDialog: React.FC<RemoveGenreDialogProps> = ({
  selectedGenreId,
  size,
}) => {
  const dispatch = useDispatch();

  const dispatchRemoveGenre = () => {
    dispatch(removeGenre(selectedGenreId));
  };

  return (
    <>
      <MenuItemDialog
        tooltipText="ジャンルを削除"
        activatorIcon={<DeleteGenreIcon fontSize={size} />}
        activatorDisabled={selectedGenreId === ''}
        doneText="削除"
        onDone={dispatchRemoveGenre}
      >
        <DialogTitle>ジャンルの削除</DialogTitle>
        <DialogContent>削除してよろしいですか？</DialogContent>
      </MenuItemDialog>
    </>
  );
};

export default RemoveGenreDialog;
