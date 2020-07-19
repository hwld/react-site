import React, { useState, useContext } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import GenresContext from '../../../context/GenresContext';
import { Genre, createDefaultGenre } from '../../../services/genres';
import OperationDialog from './OperationDialog';
import EditGenreField from '../ui/EditGenreFields';

type UpdateGenreDialogProps = {
  disabled?: boolean;
  defaultGenreId: string;
  size?: SvgIconProps['fontSize'];
};

const UpdateGenreDialog: React.FC<UpdateGenreDialogProps> = ({
  disabled,
  defaultGenreId,
  size,
}) => {
  const [newGenre, setNewGenre] = useState<Genre>(createDefaultGenre());
  const { genres, updateGenre } = useContext(GenresContext);

  const update = () => {
    updateGenre(newGenre);
  };

  const setDefaultGenreName = () => {
    const defaultGenre = genres.find(genre => genre.id === defaultGenreId);
    if (!defaultGenre) {
      throw Error('存在しないジャンル');
    }
    setNewGenre(defaultGenre);
  };

  const changeGenreName = (genreName: string) => {
    setNewGenre(state => ({ ...state, genreName }));
  };

  return (
    <OperationDialog
      tooltipText="ジャンルを編集"
      activatorIcon={<EditIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="変更"
      onDone={update}
      doneDisabled={newGenre.genreName === ''}
      onOpen={setDefaultGenreName}
      data-testid="updateGenreDialog"
    >
      <DialogTitle>ジャンルの編集</DialogTitle>
      <DialogContent>
        <EditGenreField genre={newGenre} onChange={changeGenreName} />
      </DialogContent>
    </OperationDialog>
  );
};

export default UpdateGenreDialog;
