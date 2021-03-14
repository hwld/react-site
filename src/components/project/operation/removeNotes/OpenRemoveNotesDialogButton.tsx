import React, { forwardRef, PropsWithChildren } from 'react';
import { SvgIconProps } from '@material-ui/core';
import DeleteNoteIcon from '@material-ui/icons/Delete';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { RemoveNotesDialog } from './RemoveNotesDialog';
import { useAppStateContext } from '../../../../context/AppStateContext';

type Props = {
  className?: string;
  disabled?: boolean;
  targetNoteIds: string[];
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function RemoveNoteButton(
    { className, disabled, targetNoteIds, size, tabIndex },
    ref,
  ) {
    const { isOpen, open, close } = useOpener(false);
    const { removeNotes } = useNotesContext();
    const { isMobile } = useAppStateContext();

    const handleRemoveNotes = (event: React.SyntheticEvent) => {
      event.stopPropagation();
      removeNotes(targetNoteIds);
      close();
    };

    return (
      <>
        <ActivatorButton
          className={className}
          ref={ref}
          disabled={disabled}
          aria-label="メモ削除ダイアログを表示"
          tooltipText="メモの削除"
          onClick={open}
          tabIndex={tabIndex}
          onFocus={e => e.stopPropagation()}
        >
          <DeleteNoteIcon fontSize={size} />
        </ActivatorButton>
        <RemoveNotesDialog
          isOpen={isOpen}
          isMobile={isMobile}
          onClose={close}
          onRemoveNotesDialog={handleRemoveNotes}
        />
      </>
    );
  },
);

export const OpenRemoveNotesDialogButton = Component;
