import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { NoteField } from '../../../../services/notes';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { UpdateNoteDialog } from './UpdateNoteDialog';

type Props = {
  className?: string;
  disabled?: boolean;
  defaultNoteId?: string;
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function UpdateNoteButton(
    { className, disabled, defaultNoteId, size, tabIndex },
    ref,
  ) {
    const { isOpen, open, close } = useOpener(false);
    const { notes, updateNote } = useNotesContext();

    const defaultNote = useMemo(() => {
      return notes.find(n => n.id === defaultNoteId);
    }, [defaultNoteId, notes]);

    const handleUpdateNote = (field: NoteField) => {
      if (defaultNoteId) {
        updateNote({ id: defaultNoteId, ...field });
      }
      close();
    };

    return (
      <>
        <ActivatorButton
          className={className}
          ref={ref}
          disabled={disabled}
          aria-label="メモ編集ダイアログを表示"
          tooltipText="メモの編集"
          onClick={open}
          tabIndex={tabIndex}
        >
          <EditIcon fontSize={size} />
        </ActivatorButton>
        <UpdateNoteDialog
          isOpen={isOpen}
          onClose={close}
          defaultField={defaultNote}
          onUpdateNote={handleUpdateNote}
        />
      </>
    );
  },
);

export const OpenUpdateNoteDialogButton = Component;
