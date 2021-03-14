import React from 'react';
import AddNoteIcon from '@material-ui/icons/NoteAdd';
import { SvgIconProps } from '@material-ui/core';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { AddNoteDialog } from './AddNoteDialog';
import { NoteField } from '../../../../services/notes';
import { useOpener } from '../../../../util/hooks/useOpener';
import { useAppStateContext } from '../../../../context/AppStateContext';

type Props = {
  disabled?: boolean;
  categoryId: string;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, categoryId, size }) => {
  const { isOpen, open, close } = useOpener(false);
  const { addNote } = useNotesContext();
  const { isMobile } = useAppStateContext();

  const handleAddNote = (field: NoteField) => {
    addNote(categoryId, field);
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        aria-label="メモ追加ダイアログを表示"
        tooltipText="メモの追加"
        onClick={open}
      >
        <AddNoteIcon fontSize={size} />
      </ActivatorButton>
      <AddNoteDialog
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={close}
        onAddNote={handleAddNote}
      />
    </>
  );
};

export const OpenAddNoteDialogButton = Component;
