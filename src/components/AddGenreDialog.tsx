import React, { useState } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import AddGenreIcon from '@material-ui/icons/CreateNewFolder';
import { Genre, GenreField } from 'services/storage/genres';
import MenuItemDialog from './MenuItemDialog';
import EditGenreField from './EditGenreField';

interface AddGenreDialogProps {
  add: (genre: Genre) => void;
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const AddGenreDialog: React.FC<AddGenreDialogProps> = ({
  add,
  selectedGenreId,
  size,
}) => {
  const [genre, setGenre] = useState<GenreField>({
    genreName: '',
  });

  const addGenre = () => {
    add({
      id: '',
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
        onDone={addGenre}
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
