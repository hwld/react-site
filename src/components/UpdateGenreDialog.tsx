import React, { useState } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import { updateGenre, GenreField } from 'stores/store';
import MenuItemDialog from './MenuItemDialog';
import EditGenreField from './EditGenreField';

interface UpdateGenreDialogProps {
  defaultGenre: GenreField & { id: string };
  size?: SvgIconProps['fontSize'];
}

const UpdateGenreDialog: React.FC<UpdateGenreDialogProps> = ({
  defaultGenre,
  size,
}) => {
  const [genre, setGenre] = useState(defaultGenre);
  const dispatch = useDispatch();

  const dispatchUpdateGenre = () => {
    dispatch(
      updateGenre({
        ...genre,
      }),
    );
  };

  const setDefaultGenreName = () => {
    setGenre(defaultGenre);
  };

  const changeGenreName = (genreName: string) => {
    setGenre(state => ({ ...state, genreName }));
  };

  return (
    <MenuItemDialog
      tooltipText="ジャンルを編集"
      activatorIcon={<EditIcon fontSize={size} />}
      activatorDisabled={defaultGenre.id === ''}
      doneText="変更"
      onDone={dispatchUpdateGenre}
      doneDisabled={genre.genreName === ''}
      onOpen={setDefaultGenreName}
    >
      <DialogTitle>ジャンルの編集</DialogTitle>
      <DialogContent>
        <EditGenreField genre={genre} onChange={changeGenreName} />
      </DialogContent>
    </MenuItemDialog>
  );
};

export default UpdateGenreDialog;
