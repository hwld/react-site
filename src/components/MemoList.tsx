import React from 'react';
import { List } from '@material-ui/core';
import MemoListItem, { Memo } from './MemoListItem';

interface MemoListProps {
  memos: Memo[];
  selectedGenreId: string;
}

const MemoList: React.FC<MemoListProps> = ({ memos, selectedGenreId }) => {
  const renderListItem = () => {
    return memos
      .filter(memo => memo.genreId === selectedGenreId)
      .map(memo => <MemoListItem memo={memo} key={memo.id} />);
  };

  return <List component="nav">{renderListItem()}</List>;
};

export default MemoList;
