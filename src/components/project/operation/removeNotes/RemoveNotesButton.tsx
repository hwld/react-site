import React, { forwardRef, PropsWithChildren } from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { RemoveNotesDialog } from './RemoveNotesDialog';

type Props = {
  disabled?: boolean;
  targetNoteIds: string[];
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function RemoveNoteButton({ disabled, targetNoteIds, size, tabIndex }, ref) {
    const { isOpen, open, close } = useDialog(false);
    const { removeNotes } = useNotesContext();

    const handleClick = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      open();
    };

    const handleRemoveNotes = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      removeNotes(targetNoteIds);
      close();
    };

    const handleCancel = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      close();
    };

    return (
      <>
        <ActivatorButton
          ref={ref}
          disabled={disabled}
          tooltipText="メモの削除"
          onClick={handleClick}
          tabIndex={tabIndex}
          data-testid="activatorButton"
        >
          <DeleteNoteIcon fontSize={size} />
        </ActivatorButton>
        <RemoveNotesDialog
          isOpen={isOpen}
          onClose={close}
          onRemoveNotesDialog={handleRemoveNotes}
          onCancel={handleCancel}
        />
      </>
    );
  },
);

export const RemoveNotesButton = Component;
