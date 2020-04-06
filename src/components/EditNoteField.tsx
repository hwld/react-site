import React, { useContext } from 'react';
import { TextField } from '@material-ui/core';
import styled from 'styled-components';
import { NoteField } from 'services/storage/notes';
import AutoComplete from '@material-ui/lab/Autocomplete';
import NotesContext from 'context/NotesContext';

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
  defaultNote: NoteField;
  authorNameList?: string[];
  bookNameList?: string[];
  onChange: (fieldName: keyof NoteField, value: string) => void;
}

const EditNoteField: React.FC<EditNoteFieldProps> = ({
  defaultNote,
  onChange,
}) => {
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

  const { notes } = useContext(NotesContext);
  // 重複のないリストを作成
  const authorNameList = Array.from(
    new Set(notes.map(note => note.authorName)),
  );
  const bookNameList = Array.from(new Set(notes.map(note => note.bookName)));

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
        <AutoComplete
          freeSolo
          options={authorNameList}
          defaultValue={authorName}
          onChange={changeSelectAuthorName}
          disableClearable
          renderInput={params => (
            <FormTextField
              {...params}
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
          defaultValue={bookName}
          onChange={changeSelectBookName}
          disableClearable
          renderInput={params => (
            <FormTextField
              {...params}
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
