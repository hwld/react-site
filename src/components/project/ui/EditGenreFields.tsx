import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { GenreField } from '../../../services/genres';

interface EditGenreFieldProps {
  genre: GenreField;
  onChange: (genreName: string) => void;
}

const StyledTextField = styled(TextField)`
  & label.Mui-focused,
  .MuiFormLabel-root {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

const EditGenreField: React.FC<EditGenreFieldProps> = ({ genre, onChange }) => {
  const { genreName } = genre;

  const changeGenreName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledTextField
      label="ジャンル名"
      error={genreName.length === 0}
      helperText="※ジャンル名は必須項目です"
      value={genreName}
      onChange={changeGenreName}
      color="secondary"
      variant="filled"
      fullWidth
    />
  );
};

export default EditGenreField;
