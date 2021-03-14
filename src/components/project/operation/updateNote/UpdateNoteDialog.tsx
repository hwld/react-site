import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import styled, { css } from 'styled-components';
import { NoteField } from '../../../../services/notes';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { NoteForm } from '../../ui/NoteForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  className?: string;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  defaultField?: NoteField;
  onUpdateNote: (field: NoteField) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  isMobile,
  onClose,
  defaultField,
  onUpdateNote,
}) => {
  const formId = 'updateNoteForm';

  return (
    <OperationDialog
      className={className}
      open={isOpen}
      isMobile={isMobile}
      onClose={onClose}
      maxWidth="md"
    >
      <DialogTitle>メモの編集</DialogTitle>

      <DialogContent className="dialogContent">
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

export const UpdateNoteDialog = styled(Component)`
  .dialogContent {
    ${props =>
      props.isMobile &&
      css`
        padding: 8px 10px;
      `}
  }
`;
