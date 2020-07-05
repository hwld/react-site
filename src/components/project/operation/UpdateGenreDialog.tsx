import React, { useState, useContext } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import GenresContext from '../../../context/GenresContext';
import { Genre } from '../../../services/genres';
import OperationDialog from './OperationDialog';
import EditGenreField from '../ui/EditGenreFields';

interface UpdateGenreDialogProps {
  disabled?: boolean;
  defaultGenre: Genre;
  size?: SvgIconProps['fontSize'];
}

const UpdateGenreDialog: React.FC<UpdateGenreDialogProps> = ({
  disabled,
  defaultGenre,
  size,
}) => {
  const [genre, setGenre] = useState(defaultGenre);
  const { updateGenre } = useContext(GenresContext);

  const update = () => {
    updateGenre(genre);
  };

  const setDefaultGenreName = () => {
    setGenre(defaultGenre);
  };

  const changeGenreName = (genreName: string) => {
    setGenre(state => ({ ...state, genreName }));
  };

  return (
    <OperationDialog
      tooltipText="ジャンルを編集"
      activatorIcon={<EditIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="変更"
      onDone={update}
      doneDisabled={genre.genreName === ''}
      onOpen={setDefaultGenreName}
      data-testid="updateGenreDialog"
    >
      <DialogTitle>ジャンルの編集</DialogTitle>
      <DialogContent>
        <EditGenreField genre={genre} onChange={changeGenreName} />
      </DialogContent>
    </OperationDialog>
  );
};

export default UpdateGenreDialog;
