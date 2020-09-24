import React, { useState, forwardRef, PropsWithChildren } from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { OperationDialog } from './OperationDialog';
import { EditNoteField } from '../ui/EditNoteFields';
import {
  getDefaultNote,
  Note,
  NoteField,
} from '../../../services/noteStoreService';
import { useNotesContext } from '../../../context/NotesContext';

type UpdateNoteDialogProps = {
  disabled?: boolean;
  defaultNoteId: string;
  size?: SvgIconProps['fontSize'];
  tabIndex?: number;
};

export const UpdateNoteDialog = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<UpdateNoteDialogProps>
>(function UpdateNoteDialog({ disabled, defaultNoteId, size, tabIndex }, ref) {
  const [newNote, setNewNote] = useState<Note>(getDefaultNote());
  const { notes, updateNote } = useNotesContext();

  const update = () => {
    updateNote(newNote);
  };

  const setDefaultNote = () => {
    const defaultNote = notes.find(note => note.id === defaultNoteId);
    if (!defaultNote) {
      throw Error('存在しないノート');
    }
    setNewNote(defaultNote);
  };

  const changeNoteField = (fieldName: keyof NoteField, value: string) => {
    setNewNote(state => ({ ...state, [fieldName]: value }));
  };

  return (
    <OperationDialog
      tooltipText="メモを編集"
      activatorIcon={<EditIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="変更"
      onDone={update}
      doneDisabled={newNote.text.length === 0}
      onOpen={setDefaultNote}
      data-testid="updateNoteDialog"
      tabIndex={tabIndex}
      ref={ref}
    >
      <DialogTitle>メモの編集</DialogTitle>
      <DialogContent>
        <EditNoteField defaultNote={newNote} onChange={changeNoteField} />
      </DialogContent>
    </OperationDialog>
  );
});
