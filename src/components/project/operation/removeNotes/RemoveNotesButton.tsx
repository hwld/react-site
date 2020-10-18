import React, { forwardRef, PropsWithChildren, useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import { useNotesContext } from '../../../../context/NotesContext';
import { OperationDialog } from '../OperationDialog';
import { RemoveNotesDialogContent } from './RemoveNotesDialogContent';
import { OperationIconButton } from '../OperationIconButton';

type Props = {
  disabled?: boolean;
  targetNoteIds: string[];
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function RemoveNoteDialog({ disabled, targetNoteIds, size, tabIndex }, ref) {
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
          <OperationIconButton
            ref={ref}
            disabled={disabled}
            tooltipText="メモの削除"
            onClick={handleClick}
            tabIndex={tabIndex}
            data-testid="activatorButton"
          >
            <DeleteNoteIcon fontSize={size} />
          </OperationIconButton>
        }
        doneText="削除"
        onDone={remove}
        data-testid="removeNoteDialog"
      >
        <RemoveNotesDialogContent />
      </OperationDialog>
    );
  },
);

export const RemoveNotesButton = Component;
