import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { GenreField } from '../../../services/genres';

const StyledTextField = styled(TextField)`
  & label.Mui-focused,
  .MuiFormLabel-root {
    color: ${props => props.theme.palette.secondary.main};
  }

  & .MuiFormHelperText-root {
    font-size: large;
  }

  & .MuiFilledInput-input:-webkit-autofill {
    box-shadow: 0 0 0 100px ${props => props.theme.palette.primary.main}e5 inset;
  }
`;

type EditGenreFieldProps = {
  genre: GenreField;
  onChange: (genreName: string) => void;
};

const EditGenreField: React.FC<EditGenreFieldProps> = ({ genre, onChange }) => {
  const { genreName } = genre;

  const changeGenreName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <StyledTextField
      inputProps={{ maxLength: 100 }}
      placeholder="(100文字以内で入力してください)"
      id="EditGenreFieldsGenreName"
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
