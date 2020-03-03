import React from 'react';
import { ListItem, ListItemText, Typography } from '@material-ui/core';
import styled from 'styled-components';

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

const TitleText = styled(Typography)`
  font-size: 2em;
`;

const MemoText = styled(Typography)`
  font-size: 1.2em;
  margin-left: 10px;
`;

const MetaData = styled.div`
  margin-top: 1em;
`;

const MetaText = styled(Typography)`
  font-size: 1em;
`;

const MemoListItem: React.FC<MemoListItemProps> = ({ memo }) => {
  return (
    <ListItem button>
      <ListItemText>
        <TitleText>{memo.title}</TitleText>
        <MemoText>{memo.text}</MemoText>
        <MetaData>
          <MetaText>著者名:{memo.authorName}</MetaText>
          <MetaText>書籍名:{memo.bookName}</MetaText>
        </MetaData>
      </ListItemText>
    </ListItem>
  );
};

export default MemoListItem;
