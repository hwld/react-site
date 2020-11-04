import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { MoveNotesDialog } from './MoveNotesDIalog';

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

  const handleMove = (event: React.SyntheticEvent) => {
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
      <MoveNotesDialog
        isOpen={isOpen}
        onClose={close}
        selectCategory={selectCategory}
        categories={categories}
        destCategoryId={destCategoryId}
        onCancel={handleCancel}
        onMove={handleMove}
      />
    </>
  );
};

export const MoveNotesButton = Component;
