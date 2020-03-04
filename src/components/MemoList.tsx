import React, { useState } from 'react';
import { List } from '@material-ui/core';
import MemoListItem, { Memo } from './MemoListItem';

interface MemoListProps {
  memos: Memo[];
  selectedGenreId: string;
}

const MemoList: React.FC<MemoListProps> = ({ memos, selectedGenreId }) => {
  const [selectedMemoId, setSelectedMemoId] = useState('');

  const selectMemoItem = (id: string) => {
    if (selectedMemoId === id) {
      setSelectedMemoId('');
    } else {
      setSelectedMemoId(id);
    }
  };

  const renderListItem = () => {
    return memos
      .filter(memo => memo.genreId === selectedGenreId)
      .map(memo => (
        <MemoListItem
          onClick={() => selectMemoItem(memo.id)}
          selected={memo.id === selectedMemoId}
          memo={memo}
          key={memo.id}
        />
      ));
  };

  return <List component="nav">{renderListItem()}</List>;
};

export default MemoList;
