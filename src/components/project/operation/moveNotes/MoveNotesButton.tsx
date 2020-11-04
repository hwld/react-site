import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogTitle,
  SvgIconProps,
  Typography,
} from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { MoveNotesDialogContent } from './MoveNotesDialogContent';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';

type Props = {
  disabled?: boolean;
  sourceNoteIds: string[];
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, sourceNoteIds, size }) => {
  const { isOpen, open, close } = useDialog(false);
  const [destCategoryId, setDestCategoryId] = useState('');
  const { categories } = useCategoriesContext();
  const { moveNotes } = useNotesContext();

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setDestCategoryId('');
    open();
  };

  const handleDone = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    moveNotes(sourceNoteIds, destCategoryId);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
  };

  const selectCategory = (ids: string[]) => {
    setDestCategoryId(ids[0] || '');
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        tooltipText="メモの移動"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <MoveNoteIcon fontSize={size} />
      </ActivatorButton>
      <OperationDialog
        open={isOpen}
        onClose={close}
        data-testid="moveNotesDialog"
      >
        <DialogTitle>メモの移動</DialogTitle>
        <MoveNotesDialogContent
          categories={categories}
          destCategoryId={destCategoryId}
          onCategorySelect={selectCategory}
        />
        <DialogActions>
          <Button onClick={handleDone} data-testid="doneButton">
            <Typography color="textSecondary">移動</Typography>
          </Button>
          <Button onClick={handleCancel} data-testid="cancelButton">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </OperationDialog>
    </>
  );
};

export const MoveNotesButton = Component;
