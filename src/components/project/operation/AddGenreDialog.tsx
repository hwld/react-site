import React, { useState } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import AddGenreIcon from '@material-ui/icons/CreateNewFolder';
import { OperationDialog } from './OperationDialog';
import { EditGenreField } from '../ui/EditGenreFields';
import { useGenresContext } from '../../../context/GenresContext';
import { GenreField, getDefaultGenre } from '../../../services/genres';

type AddGenreDialogProps = {
  disabled?: boolean;
  parentGenreId: string;
  size?: SvgIconProps['fontSize'];
};

const AddGenreDialog: React.FC<AddGenreDialogProps> = ({
  disabled,
  parentGenreId,
  size,
}) => {
  const { addGenre } = useGenresContext();
  const [genreField, setGenreField] = useState<GenreField>(getDefaultGenre());

  const add = () => {
    addGenre(parentGenreId, genreField);
  };

  const clearField = () => {
    setGenreField({ genreName: '' });
  };

  const changeGenreName = (text: string) => {
    setGenreField({ genreName: text });
  };

  return (
    <OperationDialog
      tooltipText="ジャンルを追加"
      activatorIcon={<AddGenreIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="追加"
      onDone={add}
      doneDisabled={genreField.genreName.length === 0}
      onOpen={clearField}
      data-testid="addGenreDialog"
    >
      <DialogTitle>ジャンルの追加</DialogTitle>
      <DialogContent>
        <EditGenreField genre={genreField} onChange={changeGenreName} />
      </DialogContent>
    </OperationDialog>
  );
};

export { AddGenreDialog };
