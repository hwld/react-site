import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';

export interface Memo {
  id: string;
  genreId: string;
  title: string;
  text: string;
  authorName: string;
  bookName: string;
}

interface MemoListItemProps {
  memo: Memo;
}

const MemoListItem: React.FC<MemoListItemProps> = ({ memo }) => {
  return (
    <ListItem button>
      <ListItemText>
        <Typography>{memo.title}</Typography>
        <Typography>{memo.text}</Typography>
        <Typography>{memo.authorName}</Typography>
        <Typography>{memo.bookName}</Typography>
      </ListItemText>
    </ListItem>
  );
};

export default MemoListItem;
