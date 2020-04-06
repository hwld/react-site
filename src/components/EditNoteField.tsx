import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { NoteField } from 'services/storage/notes';

const FormField = styled.div`
  margin-top: 20px;
`;

const FormTextField = styled(TextField)`
  & label.Mui-focused,
  .MuiFormLabel-root {
    color: ${props => props.theme.palette.secondary.main};
  }
`;

interface EditNoteFieldProps {
  note: NoteField;
  authorNameList?: string[];
  bookNameList?: string[];
  onChange: (fieldName: keyof NoteField, value: string) => void;
}

const EditNoteField: React.FC<EditNoteFieldProps> = ({ note, onChange }) => {
  const { title, text, bookName, authorName } = note;

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('title', event.target.value);
  };
  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('text', event.target.value);
  };
  const changeBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('bookName', event.target.value);
  };
  const changeAuthorName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('authorName', event.target.value);
  };

  return (
    <>
      <FormField>
        <FormTextField
          label="タイトル"
          value={title}
          onChange={changeTitle}
          color="secondary"
          variant="filled"
          fullWidth
        />
      </FormField>
      <FormField>
        <FormTextField
          label="メモ"
          error={text.length === 0}
          helperText="※メモは必須項目です."
          value={text}
          onChange={changeText}
          color="secondary"
          variant="filled"
          fullWidth
          rowsMax="6"
          rows="6"
          multiline
        />
      </FormField>
      <FormField>
        <FormTextField
          label="著者名"
          value={authorName}
          onChange={changeAuthorName}
          color="secondary"
          variant="filled"
          fullWidth
        />
      </FormField>
      <FormField>
        <FormTextField
          label="書籍名"
          value={bookName}
          onChange={changeBookName}
          color="secondary"
          variant="filled"
          fullWidth
        />
      </FormField>
    </>
  );
};

export default EditNoteField;
