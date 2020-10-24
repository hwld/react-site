import { DialogContent } from '@material-ui/core';
import React from 'react';
import { NoteField } from '../../../../services/notes';
import { EditNoteFields } from '../../ui/EditNoteFields';

type Props = {
  className?: string;
  noteField: NoteField;
  onChange: (fieldName: keyof NoteField, value: string) => void;
};

const Component: React.FC<Props> = ({ className, noteField, onChange }) => {
  return (
    <DialogContent className={className}>
      <EditNoteFields noteField={noteField} onChange={onChange} />
    </DialogContent>
  );
};

export const AddNoteDialogContent = Component;
