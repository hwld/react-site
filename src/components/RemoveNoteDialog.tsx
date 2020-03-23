import React from 'react';
import { DialogTitle, DialogContent, SvgIconProps } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import MenuItemDialog from './MenuItemDialog';

interface RemoveNoteDialogProps {
  remove: (id: string) => void;
  selectedNoteIds: string[];
  size?: SvgIconProps['fontSize'];
}

const RemoveNoteDialog: React.FC<RemoveNoteDialogProps> = ({
  remove,
  selectedNoteIds,
  size,
}) => {
  const removeNotes = () => {
    selectedNoteIds.forEach(id => remove(id));
  };

  return (
    <>
      <MenuItemDialog
        tooltipText="メモを削除"
        activatorIcon={<DeleteNoteIcon fontSize={size} />}
        activatorDisabled={selectedNoteIds.length === 0}
        doneText="削除"
        onDone={removeNotes}
      >
        <DialogTitle>メモの削除</DialogTitle>
        <DialogContent>削除してよろしいですか?</DialogContent>
      </MenuItemDialog>
    </>
  );
};

export default RemoveNoteDialog;
