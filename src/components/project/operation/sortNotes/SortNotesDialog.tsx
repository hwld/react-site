import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import { NotesSortOrder } from '../../../../services/notes';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { NotesSortConditionForm } from '../../ui/NotesSortConditionForm/NotesSortConditionForm';

import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  defaultSortOrder: NotesSortOrder;
  onSortNotes: (order: NotesSortOrder) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  isMobile,
  onClose,
  defaultSortOrder,
  onSortNotes,
}) => {
  const formId = 'sortNotesDialogForm';

  return (
    <OperationDialog open={isOpen} isMobile={isMobile} onClose={onClose}>
      <DialogTitle>メモの並び替え</DialogTitle>

      <DialogContent>
        <NotesSortConditionForm
          id={formId}
          defaultOrder={defaultSortOrder}
          onSubmit={onSortNotes}
        />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton type="submit" text="並び替え" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const SortNotesDialog = Component;
