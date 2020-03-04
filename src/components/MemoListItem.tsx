import React from 'react';
import { ListItem, Typography, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
  selected: boolean;
  onSelectMemo: () => void;
  onDeleteMemo: () => void;
  onEditMemo: () => void;
}

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: end;
`;

const MemoTextContainer = styled.div`
  padding-left: 20px;
`;

const TitleText = styled(Typography)`
  font-size: 2em;
`;

const MemoText = styled(Typography)`
  white-space: pre-line;
  width: 100%;
  font-size: 1.2em;
  margin-top: 20px;
  margin-left: 20px;
`;

const MetaData = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 1em;
`;

const MetaText = styled(Typography)`
  font-size: 1em;
  color: #c0c0c0;
`;

const StyledIconButton = styled(IconButton)`
  margin-left: 10px;
  background-color: ${props => props.theme.palette.secondary.main};

  &:hover {
    background-color: ${props => props.theme.palette.secondary.dark};
  }
`;

const MemoListItem: React.FC<MemoListItemProps> = ({
  memo,
  selected,
  onSelectMemo,
  onDeleteMemo,
  onEditMemo,
}) => {
  return (
    <ListItem button selected={selected} onClick={onSelectMemo}>
      <GridContainer>
        <MemoTextContainer>
          <TitleText variant="h4">{memo.title}</TitleText>
          <MemoText>{memo.text}</MemoText>
          <MetaData>
            <MetaText>著者名:{memo.authorName}</MetaText>
            <MetaText>書籍名:{memo.bookName}</MetaText>
          </MetaData>
        </MemoTextContainer>
        <div>
          <StyledIconButton
            onClick={event => {
              event.stopPropagation();
              onDeleteMemo();
            }}
            size="medium"
          >
            <DeleteIcon />
          </StyledIconButton>
          <StyledIconButton
            onClick={event => {
              event.stopPropagation();
              onEditMemo();
            }}
            size="medium"
          >
            <EditIcon />
          </StyledIconButton>
        </div>
      </GridContainer>
    </ListItem>
  );
};

export default MemoListItem;
