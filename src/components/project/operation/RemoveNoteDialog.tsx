import React, { forwardRef, PropsWithChildren } from 'react';
import {
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

export const RemoveNoteDialog = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<RemoveNoteDialogProps>
>(function RemoveNoteDialog({ disabled, targetNoteIds, size, tabIndex }, ref) {
  const { removeNotes } = useNotesContext();

  const remove = () => {
    removeNotes(targetNoteIds);
  };

  return (
    <OperationDialog
      title="メモの削除"
      activatorIcon={<DeleteNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="削除"
      onDone={remove}
      data-testid="removeNoteDialog"
      tabIndex={tabIndex}
      ref={ref}
    >
      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか?
        </DialogContentText>
      </DialogContent>
    </OperationDialog>
  );
});
