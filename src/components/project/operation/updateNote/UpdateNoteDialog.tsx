import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { NoteField } from '../../../../services/notes';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { NoteForm } from '../../ui/NoteForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  defaultField?: NoteField;
  onUpdateNote: (field: NoteField) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultField,
  onUpdateNote,
}) => {
  const formId = 'updateNoteForm';

  return (
    <OperationDialog
      open={isOpen}
      onClose={onClose}
      data-testid="updateNoteDialog"
      maxWidth="md"
    >
      <DialogTitle>メモの編集</DialogTitle>

      <DialogContent>
        <NoteForm
          id={formId}
          defaultField={defaultField}
          onSubmit={onUpdateNote}
        />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="変更" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const UpdateNoteDialog = Component;
