import React, { useState } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import AddGenreIcon from '@material-ui/icons/CreateNewFolder';
import { GenreField, useGenres } from 'services/storage/genres';
import { useCurrentUserId } from 'services/auth';
import MenuItemDialog from './MenuItemDialog';
import EditGenreField from '../EditGenreField';

interface AddGenreDialogProps {
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const AddGenreDialog: React.FC<AddGenreDialogProps> = ({
  selectedGenreId,
  size,
}) => {
  const { userId } = useCurrentUserId();
  const { addGenre } = useGenres(userId);
  const [genre, setGenre] = useState<GenreField>({
    genreName: '',
  });

  const add = () => {
    window.console.log('new impl addGenre');
    addGenre({
      id: '',
      creationDate: new Date(),
      genreName: genre.genreName,
      parentGenreId: selectedGenreId,
      childrenGenreIds: [],
    });
  };

  const clearField = () => {
    setGenre({ genreName: '' });
  };

  const changeGenreName = (text: string) => {
    setGenre({ genreName: text });
  };

  return (
    <>
      <MenuItemDialog
        tooltipText="ジャンルを追加"
        activatorIcon={<AddGenreIcon fontSize={size} />}
        doneText="追加"
        onDone={add}
        doneDisabled={genre.genreName.length === 0}
        onOpen={clearField}
      >
        <DialogTitle>ジャンルの追加</DialogTitle>
        <DialogContent>
          <EditGenreField genre={genre} onChange={changeGenreName} />
        </DialogContent>
      </MenuItemDialog>
    </>
  );
};

export default AddGenreDialog;
