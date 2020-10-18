import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { MoveNotesDialogContent } from './MoveNotesDialogContent';
import { IconButton } from '../../../ui/IconButton';

type Props = {
  disabled?: boolean;
  sourceNoteIds: string[];
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, sourceNoteIds, size }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [destCategoryId, setDestCategoryId] = useState('');
  const { categories } = useCategoriesContext();
  const { moveNotes } = useNotesContext();

  const move = () => {
    moveNotes(sourceNoteIds, destCategoryId);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(true);
    setDestCategoryId('');
  };

  const selectCategory = (ids: string[]) => {
    setDestCategoryId(ids[0] || '');
  };

  return (
    <OperationDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="メモの移動"
      activator={
        <IconButton
          disabled={disabled}
          tooltipText="メモの移動"
          onClick={handleClick}
          data-testid="activatorButton"
        >
          <MoveNoteIcon fontSize={size} />
        </IconButton>
      }
      doneText="移動"
      onDone={move}
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

export const MoveNotesButton = Component;
