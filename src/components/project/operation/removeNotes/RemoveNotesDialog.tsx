import React, { forwardRef, PropsWithChildren, useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import { useNotesContext } from '../../../../context/NotesContext';
import { OperationDialog } from '../OperationDialog';
import { RemoveNotesDialogContent } from './RemoveNotesDialogContent';
import { IconButton } from '../../../ui/IconButton';

type RemoveNotesDialogProps = {
  disabled?: boolean;
  targetNoteIds: string[];
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

export const RemoveNotesDialog = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<RemoveNotesDialogProps>
>(function RemoveNoteDialog({ disabled, targetNoteIds, size, tabIndex }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeNotes } = useNotesContext();

  const remove = () => {
    removeNotes(targetNoteIds);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  return (
    <OperationDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="メモの削除"
      activator={
        <IconButton
          ref={ref}
          disabled={disabled}
          tooltipText="メモの削除"
          onClick={handleClick}
          tabIndex={tabIndex}
          data-testid="activatorButton"
        >
          <DeleteNoteIcon fontSize={size} />
        </IconButton>
      }
      doneText="削除"
      onDone={remove}
      data-testid="removeNoteDialog"
    >
      <RemoveNotesDialogContent />
    </OperationDialog>
  );
});
