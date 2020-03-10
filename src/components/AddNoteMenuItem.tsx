import React, { useState } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import {
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addNote } from 'stores/store';
import MenuItemDialog from './MenuItemDialog';

const FormField = styled.div`
  margin-top: 20px;
`;

interface AddNoteMenuItemProps {
  selectedGenreId: string;
  size?: 'inherit' | 'default' | 'small' | 'large';
}

const AddNoteMenuItem: React.FC<AddNoteMenuItemProps> = ({
  selectedGenreId,
  size,
}) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [bookName, setBookName] = useState('');
  const dispatch = useDispatch();

  const AddNote = () => {
    dispatch(
      addNote({
        id: '',
        genreId: selectedGenreId,
        title,
        text,
        authorName,
        bookName,
      }),
    );
  };

  const ClearField = () => {
    setTitle('');
    setText('');
    setAuthorName('');
    setBookName('');
  };

  return (
    <MenuItemDialog
      tooltipText="メモを追加"
      activatorIcon={<AddNoteIcon fontSize={size} />}
      activatorDisabled={selectedGenreId === ''}
      doneText="追加"
      onDone={AddNote}
      doneDisabled={text.length === 0}
      onOpen={ClearField}
    >
      <DialogTitle>メモの追加</DialogTitle>
      <DialogContent>
        <FormField>
          <Typography>タイトル</Typography>
          <TextField
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            color="secondary"
            variant="filled"
            fullWidth
          />
        </FormField>
        <FormField>
          <Typography>メモ</Typography>
          <TextField
            error={text.length === 0}
            helperText="※メモは必須項目です."
            value={text}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setText(event.target.value)
            }
            color="secondary"
            variant="filled"
            fullWidth
            rowsMax="6"
            rows="6"
            multiline
          />
        </FormField>
        <FormField>
          <Typography>著者名</Typography>
          <TextField
            value={authorName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAuthorName(event.target.value)
            }
            color="secondary"
            variant="filled"
            fullWidth
          />
        </FormField>
        <FormField>
          <Typography>書籍名</Typography>
          <TextField
            value={bookName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setBookName(event.target.value)
            }
            color="secondary"
            variant="filled"
            fullWidth
          />
        </FormField>
      </DialogContent>
    </MenuItemDialog>
  );
};

export default AddNoteMenuItem;
