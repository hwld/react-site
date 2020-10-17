import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { CategoryField } from '../../../services/categories';

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

type EditCategoryFieldProps = {
  category: CategoryField;
  onChange: (fieldName: keyof CategoryField, value: string) => void;
};

const EditCategoryField: React.FC<EditCategoryFieldProps> = ({
  category,
  onChange,
}) => {
  const { categoryName } = category;

  const changeCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('categoryName', event.target.value);
  };

  return (
    <StyledTextField
      inputProps={{ maxLength: 100, autoComplete: 'off' }}
      placeholder="(100文字以内で入力してください)"
      id="EditCategoryFieldsCategoryName"
      label="カテゴリー名"
      error={categoryName.length === 0}
      helperText="※カテゴリー名は必須項目です"
      value={categoryName}
      onChange={changeCategoryName}
      color="secondary"
      variant="filled"
      fullWidth
    />
  );
};

export { EditCategoryField };
