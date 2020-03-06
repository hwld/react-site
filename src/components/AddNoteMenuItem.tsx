import React, { useState, useEffect } from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import {
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import MenuItemDialog from './MenuItemDialog';

const FormField = styled.div`
  margin-top: 20px;
`;

const AddNoteMenuItem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [bookName, setBookName] = useState('');

  const AddNote = () => {
    window.console.log(
      `Title:${title} Note:${note} Author:${authorName} Book:${bookName}`,
    );
  };

  const ClearField = () => {
    setTitle('');
    setNote('');
    setAuthorName('');
    setBookName('');
  };

  return (
    <MenuItemDialog
      activaterIcon={<AddNoteIcon fontSize="large" />}
      actionText="追加"
      onComplete={AddNote}
      onClose={ClearField}
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
            value={note}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setNote(event.target.value)
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
