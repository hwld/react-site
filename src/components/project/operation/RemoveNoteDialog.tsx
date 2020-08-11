import React from 'react';
import {
  DialogTitle,
  DialogContent,
  SvgIconProps,
  DialogContentText,
} from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import { useNotesContext } from '../../../context/NotesContext';
import { OperationDialog } from './OperationDialog';

type RemoveNoteDialogProps = {
  disabled?: boolean;
  targetNoteIds: string[];
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const RemoveNoteDialog: React.FC<RemoveNoteDialogProps> = ({
  disabled,
  targetNoteIds,
  size,
  tabIndex,
}) => {
  const { removeNotes } = useNotesContext();

  const remove = () => {
    removeNotes(targetNoteIds);
  };

  return (
    <OperationDialog
      tooltipText="メモを削除"
      activatorIcon={<DeleteNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="削除"
      onDone={remove}
      data-testid="removeNoteDialog"
      tabIndex={tabIndex}
    >
      <DialogTitle>メモの削除</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか?
        </DialogContentText>
      </DialogContent>
    </OperationDialog>
  );
};

export { RemoveNoteDialog };
