import React, { useContext } from 'react';
import { DialogTitle, DialogContent, SvgIconProps } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import NotesContext from '../../../context/NotesContext';
import OperationDialog from './OperationDialog';

interface RemoveNoteDialogProps {
  disabled?: boolean;
  targetNoteIds: string[];
  size?: SvgIconProps['fontSize'];
}

const RemoveNoteDialog: React.FC<RemoveNoteDialogProps> = ({
  disabled,
  targetNoteIds,
  size,
}) => {
  const { removeNote } = useContext(NotesContext);

  const remove = () => {
    targetNoteIds.forEach(id => removeNote(id));
  };

  return (
    <OperationDialog
      tooltipText="メモを削除"
      activatorIcon={<DeleteNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="削除"
      onDone={remove}
      data-testid="removeNoteDialog"
    >
      <DialogTitle>メモの削除</DialogTitle>
      <DialogContent>削除してよろしいですか?</DialogContent>
    </OperationDialog>
  );
};

export default RemoveNoteDialog;
