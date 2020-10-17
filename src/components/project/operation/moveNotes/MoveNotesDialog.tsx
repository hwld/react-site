import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { MoveNotesDialogContent } from './MoveNotesDialogContent';

type MoveNotesDialogProps = {
  disabled?: boolean;
  sourceNoteIds: string[];
  size?: SvgIconProps['fontSize'];
};

const MoveNotesDialog: React.FC<MoveNotesDialogProps> = ({
  disabled,
  sourceNoteIds,
  size,
}) => {
  const { categories } = useCategoriesContext();
  const [destCategoryId, setDestCategoryId] = useState('');

  const { moveNotes } = useNotesContext();

  const move = () => {
    moveNotes(sourceNoteIds, destCategoryId);
  };

  const selectCategory = (ids: string[]) => {
    setDestCategoryId(ids[0] || '');
  };

  const clearDestCategory = () => {
    setDestCategoryId('');
  };

  return (
    <OperationDialog
      title="メモの移動"
      activatorIcon={<MoveNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="移動"
      onDone={move}
      onOpen={clearDestCategory}
      data-testid="moveNotesDialog"
    >
      <MoveNotesDialogContent
        categories={categories}
        destCategoryId={destCategoryId}
        onCategorySelect={selectCategory}
      />
    </OperationDialog>
  );
};

export { MoveNotesDialog };
