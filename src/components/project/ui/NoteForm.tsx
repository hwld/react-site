import { useTypedController } from '@hookform/strictly-typed';
import { TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { NoteField } from '../../../services/notes';

type FormNoteField = Record<keyof NoteField, string>;

type Props = {
  className?: string;
  id: string;
  defaultField?: NoteField;
  onSubmit: (field: NoteField) => void;
};

const Component: React.FC<Props> = ({
  className,
  id,
  defaultField,
  onSubmit,
}) => {
  const { control, errors, handleSubmit } = useForm<FormNoteField>({
    defaultValues: {
      title: defaultField?.title || '',
      text: defaultField?.text || '',
    },
  });
  const TypedController = useTypedController<FormNoteField>({ control });

  const editNote = (field: FormNoteField) => {
    const newFields: NoteField = { title: field.title, text: field.text };
    onSubmit(newFields);
  };

  return (
    <form id={id} onSubmit={handleSubmit(editNote)} className={className}>
      <div className="formField">
        <TypedController
          name="title"
          render={props => (
            <TextField
              id="editNoteFieldsTitle"
              label="タイトル"
              placeholder="(100文字以内で入力してください)"
              inputProps={{ autoComplete: 'off' }}
              error={!!errors.title}
              fullWidth
              {...props}
            />
          )}
          rules={{
            maxLength: { value: 100, message: '100文字以内で入力してください' },
          }}
        />
        <div className="errorField">
          <Typography className="errorText">{errors.title?.message}</Typography>
        </div>
      </div>
      <div className="formField">
        <TypedController
          name="text"
          render={props => (
            <TextField
              id="editNoteFieldsNote"
              label="メモ"
              placeholder="(5000文字以内で入力してください)"
              error={!!errors.text}
              rowsMax="20"
              rows="20"
              multiline
              fullWidth
              {...props}
            />
          )}
          rules={{
            maxLength: {
              value: 5000,
              message: '5000文字以内で入力してください',
            },
            required: { value: true, message: 'メモは必須項目です' },
          }}
        />
        <div className="errorField">
          <Typography className="errorText">{errors.text?.message}</Typography>
        </div>
      </div>
    </form>
  );
};

const StyledComponent = styled(Component)`
  & > .formField {
    margin-bottom: 5px;

    & > .errorField {
      height: 25px;

      & > .errorText {
        margin-left: 5px;
        color: ${props => props.theme.palette.error.main};
      }
    }
  }

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

export const NoteForm = StyledComponent;
