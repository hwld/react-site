import React from 'react';
import { DialogTitle, DialogContent } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { removeNote } from 'stores/store';
import MenuItemDialog from './MenuItemDialog';

interface RemoveNoteMenuItemProps {
  selectedNoteIds: string[];
  size?: 'inherit' | 'default' | 'small' | 'large';
}

const RemoveNoteMenuItem: React.FC<RemoveNoteMenuItemProps> = ({
  selectedNoteIds,
  size,
}) => {
  const dispatch = useDispatch();

  const RemoveNote = () => {
    selectedNoteIds.forEach(id => dispatch(removeNote(id)));
  };

  return (
    <>
      <MenuItemDialog
        tooltipText="メモを削除"
        activatorIcon={<DeleteNoteIcon fontSize={size} />}
        activatorDisabled={selectedNoteIds.length === 0}
        doneText="削除"
        onDone={RemoveNote}
      >
        <DialogTitle>メモの削除</DialogTitle>
        <DialogContent>削除してよろしいですか?</DialogContent>
      </MenuItemDialog>
    </>
  );
};

export default RemoveNoteMenuItem;