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
  onAddNote: (field: NoteField) => void;
};

const Component: React.FC<Props> = ({ isOpen, onClose, onAddNote }) => {
  const formId = 'addNoteForm';

  return (
    <OperationDialog open={isOpen} onClose={onClose} maxWidth="md">
      <DialogTitle>メモの追加</DialogTitle>

      <DialogContent>
        <NoteForm id={formId} onSubmit={onAddNote} />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="追加" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const AddNoteDialog = Component;
