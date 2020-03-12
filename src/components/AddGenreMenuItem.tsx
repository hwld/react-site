import React, { useState } from 'react';
import {
  SvgIconProps,
  DialogTitle,
  DialogContent,
  Typography,
  TextField,
} from '@material-ui/core';
import AddGenreIcon from '@material-ui/icons/CreateNewFolder';
import { useDispatch } from 'react-redux';
import { addGenre } from 'stores/store';
import MenuItemDialog from './MenuItemDialog';

interface AddGenreMenuItemProps {
  selectedGenreId: string;
  size?: SvgIconProps['fontSize'];
}

const AddGenreMenuItem: React.FC<AddGenreMenuItemProps> = ({
  selectedGenreId,
  size,
}) => {
  const [genreName, setGenreName] = useState('');
  const dispatch = useDispatch();

  const dispatchAddGenre = () => {
    dispatch(
      addGenre({
        id: '',
        genreName,
        parentGenreId: selectedGenreId,
        childrenGenreIds: [],
      }),
    );
  };

  const clearField = () => {
    setGenreName('');
  };

  const changeGenreName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenreName(event.target.value);
  };

  return (
    <>
      <MenuItemDialog
        tooltipText="ジャンルを追加"
        activatorIcon={<AddGenreIcon fontSize={size} />}
        doneText="追加"
        onDone={dispatchAddGenre}
        doneDisabled={genreName.length === 0}
        onOpen={clearField}
      >
        <DialogTitle>ジャンルの追加</DialogTitle>
        <DialogContent>
          <Typography>ジャンル名</Typography>
          <TextField
            value={genreName}
            onChange={changeGenreName}
            color="secondary"
            variant="filled"
            fullWidth
          />
        </DialogContent>
      </MenuItemDialog>
    </>
  );
};

export default AddGenreMenuItem;
