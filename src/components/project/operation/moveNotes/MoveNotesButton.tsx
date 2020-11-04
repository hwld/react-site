import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import { OperationDialog } from '../OperationDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { MoveNotesDialogContent } from './MoveNotesDialogContent';
import { OperationIconButton } from '../OperationIconButton';

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
    <>
      <OperationIconButton
        disabled={disabled}
        tooltipText="メモの移動"
        onClick={handleClick}
        data-testid="activatorButton"
      >
        <MoveNoteIcon fontSize={size} />
      </OperationIconButton>
      <OperationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="メモの移動"
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
    </>
  );
};

export const MoveNotesButton = Component;
