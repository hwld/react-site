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
  const { genres, removeGenre } = useContext(GenresContext);

  const remove = () => {
    // 親子関係にあるジャンルを削除しようとしたときに、子を削除対象から外す
    const getChildrenGenres = (id: string): string[] => {
      const children = genres
        .filter(genre => genre.id === id)
        .flatMap(genre => genre.childrenGenreIds);

      const grandChild = children.flatMap(childId =>
        getChildrenGenres(childId),
      );

      return [...children, ...grandChild];
    };

    // 重複をなくす
    const allChildren = Array.from(
      new Set(targetGenreIds.flatMap(id => getChildrenGenres(id))),
    );

    // 削除
    targetGenreIds
      .filter(id => !allChildren.includes(id))
      .forEach(id => removeGenre(id));
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
