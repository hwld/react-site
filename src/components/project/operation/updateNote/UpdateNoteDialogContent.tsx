import { DialogContent } from '@material-ui/core';
import React from 'react';
import { NoteField } from '../../../../services/notes';
import { EditNoteField } from '../../ui/EditNoteFields';

type Props = {
  className?: string;
  newNoteField: NoteField;
  onChangeNoteField: (fieldName: keyof NoteField, value: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  newNoteField,
  onChangeNoteField,
}) => {
  return (
    <DialogContent className={className}>
      <EditNoteField noteField={newNoteField} onChange={onChangeNoteField} />
    </DialogContent>
  );
};

export const UpdateNoteDialogContent = Component;
