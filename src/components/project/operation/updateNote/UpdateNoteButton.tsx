import React, { forwardRef, PropsWithChildren, useMemo } from 'react';
import { SvgIconProps } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { NoteField } from '../../../../services/notes';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { UpdateNoteDialog } from './UpdateNoteDialog';

type Props = {
  disabled?: boolean;
  defaultNoteId?: string;
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function UpdateNoteButton({ disabled, defaultNoteId, size, tabIndex }, ref) {
    const { isOpen, open, close } = useDialog(false);
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
          ref={ref}
          disabled={disabled}
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

export const UpdateNoteButton = Component;
