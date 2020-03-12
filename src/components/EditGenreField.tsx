import React from 'react';
import { Typography, TextField } from '@material-ui/core';

interface EditGenreFieldProps {
  genreName: string;
  onChange: (genreName: string) => void;
}

const EditGenreField: React.FC<EditGenreFieldProps> = ({
  genreName,
  onChange,
}) => {
  const changeGenreName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <>
      <Typography>ジャンル名</Typography>
      <TextField
        error={genreName.length === 0}
        helperText="※ジャンル名は必須項目です"
        value={genreName}
        onChange={changeGenreName}
        color="secondary"
        variant="filled"
        fullWidth
      />
    </>
  );
};

export default EditGenreField;
