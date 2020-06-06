import React, { useState, useContext } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import AddGenreIcon from '@material-ui/icons/CreateNewFolder';
import OperationDialog from './OperationDialog';
import EditGenreField from '../ui/EditGenreFields';
import GenresContext from '../../../context/GenresContext';
import { GenreField } from '../../../services/genres';

interface AddGenreDialogProps {
  disabled?: boolean;
  selectedGenreIds: string[];
  size?: SvgIconProps['fontSize'];
}

const AddGenreDialog: React.FC<AddGenreDialogProps> = ({
  disabled,
  selectedGenreIds,
  size,
}) => {
  const { addGenre } = useContext(GenresContext);
  const [genre, setGenre] = useState<GenreField>({
    genreName: '',
  });

  const add = () => {
    addGenre({
      id: '',
      creationDate: new Date(),
      genreName: genre.genreName,
      parentGenreId: selectedGenreIds[0] || '',
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
    <OperationDialog
      tooltipText="ジャンルを追加"
      activatorIcon={<AddGenreIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="追加"
      onDone={add}
      doneDisabled={genre.genreName.length === 0}
      onOpen={clearField}
    >
      <DialogTitle>ジャンルの追加</DialogTitle>
      <DialogContent>
        <EditGenreField genre={genre} onChange={changeGenreName} />
      </DialogContent>
    </OperationDialog>
  );
};

export default AddGenreDialog;
