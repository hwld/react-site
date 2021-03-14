import { useTypedController } from '@hookform/strictly-typed';
import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { CategoryField } from '../../../services/categories';

type FormCategoryField = Record<keyof CategoryField, string>;

export type CategoryFormProps = {
  className?: string;
  id: string;
  defaultField?: CategoryField;
  onSubmit: (field: CategoryField) => void;
};

const Component: React.FC<CategoryFormProps> = ({
  className,
  id,
  defaultField,
  onSubmit,
}) => {
  const { control, errors, handleSubmit } = useForm<FormCategoryField>({
    defaultValues: {
      categoryName: defaultField?.categoryName ?? '',
    },
  });
  const TypedController = useTypedController<FormCategoryField>({ control });

  const editCategory = (field: FormCategoryField) => {
    const newFields: CategoryField = {
      categoryName: field.categoryName.trim(),
    };
    onSubmit(newFields);
  };

  return (
    <form id={id} onSubmit={handleSubmit(editCategory)} className={className}>
      <TypedController
        name="categoryName"
        render={props => (
          <TextField
            id="EditCategoryName"
            label="カテゴリー名"
            placeholder="(100文字以内で入力してください)"
            inputProps={{ autoComplete: 'off' }}
            error={!!errors.categoryName}
            fullWidth
            {...props}
          />
        )}
        rules={{
          maxLength: { value: 100, message: '100文字以内で入力してください' },
          required: { value: true, message: 'カテゴリー名は必須項目です' },
        }}
      />
      <div className="errorField">
        {errors.categoryName && (
          <Typography
            className="errorText"
            role="alert"
            aria-label="カテゴリ名のエラー"
          >
            {errors.categoryName.message}
          </Typography>
        )}
      </div>
    </form>
  );
};

const StyledComponent = styled(Component)`
  & > .errorField {
    height: 25px;

    & > .errorText {
      margin-left: 5px;
      color: ${props => props.theme.palette.error.main};
    }
  }

  & label.Mui-focused,
  .MuiFormLabel-root {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

export const CategoryForm = StyledComponent;
