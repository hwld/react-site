import React from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { NoteField } from '../../../repositories/notes';
import { useNotesContext } from '../../../context/NotesContext';

const FormField = styled.div`
  margin-top: 20px;
`;

const FormTextField = styled(TextField)`
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

type EditNoteFieldProps = {
  defaultNote: NoteField;
  authorNameList?: string[];
  bookNameList?: string[];
  onChange: (fieldName: keyof NoteField, value: string) => void;
};

const EditNoteField: React.FC<EditNoteFieldProps> = ({
  defaultNote,
  onChange,
}) => {
  const { notes } = useNotesContext();
  const { title, text, bookName, authorName } = defaultNote;

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('title', event.target.value);
  };

  const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('text', event.target.value);
  };

  const changeSelectBookName = (event: object, value: string | null) => {
    if (value) onChange('bookName', value);
  };
  const changeBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('bookName', event.target.value);
  };

  const changeSelectAuthorName = (event: object, value: string | null) => {
    if (value) onChange('authorName', value);
  };
  const changeAuthorName = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange('authorName', event.target.value);
  };

  // 重複のないリストを作成
  const authorNameList = Array.from(
    new Set(
      notes.filter(note => note.authorName !== '').map(note => note.authorName),
    ),
  );
  const bookNameList = Array.from(
    new Set(
      notes.filter(note => note.bookName !== '').map(note => note.bookName),
    ),
  );

  return (
    <>
      <FormField>
        <FormTextField
          inputProps={{ maxLength: 100, autoComplete: 'off' }}
          placeholder="(100文字以内で入力してください)"
          id="editNoteFieldsTitle"
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
          inputProps={{ maxLength: 5000 }}
          id="editNoteFieldsNote"
          label="メモ"
          placeholder="(5000文字以内で入力してください)"
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
        <AutoComplete
          freeSolo
          options={authorNameList}
          value={authorName}
          onChange={changeSelectAuthorName}
          disableClearable
          renderInput={params => (
            <FormTextField
              {...params}
              inputProps={{
                ...params.inputProps,
                maxLength: 100,
                autoComplete: 'off',
              }}
              placeholder="(100文字以内で入力してください)"
              label="著者名"
              value={authorName}
              onChange={changeAuthorName}
              color="secondary"
              variant="filled"
              fullWidth
            />
          )}
        />
      </FormField>
      <FormField>
        <AutoComplete
          freeSolo
          options={bookNameList}
          value={bookName}
          onChange={changeSelectBookName}
          disableClearable
          renderInput={params => (
            <FormTextField
              {...params}
              inputProps={{
                ...params.inputProps,
                maxLength: 100,
                autoComplete: 'off',
              }}
              placeholder="(100文字以内で入力してください)"
              label="書籍名"
              value={bookName}
              onChange={changeBookName}
              color="secondary"
              variant="filled"
              fullWidth
            />
          )}
        />
      </FormField>
    </>
  );
};

export default EditNoteField;
