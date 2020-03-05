import React, { useState } from 'react';
import { List, Toolbar, AppBar } from '@material-ui/core';
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
          onSelectMemo={() => selectMemoItem(memo.id)}
          onDeleteMemo={() => window.console.log('delete')}
          onEditMemo={() => window.console.log('edit')}
          selected={memo.id === selectedMemoId}
          memo={memo}
          key={memo.id}
        />
      ));
  };

  return (
    <>
      <List>{renderListItem()}</List>
    </>
  );
};

export default MemoList;
