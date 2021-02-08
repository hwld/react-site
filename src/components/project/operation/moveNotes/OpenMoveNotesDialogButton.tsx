import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { useNotesContext } from '../../../../context/NotesContext';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { MoveNotesDialog } from './MoveNotesDialog';

type Props = {
  disabled?: boolean;
  sourceNoteIds: string[];
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({ disabled, sourceNoteIds, size }) => {
  const { isOpen, open, close } = useOpener(false);
  const { categories } = useCategoriesContext();
  const { moveNotes } = useNotesContext();

  const handleMove = (destCategoryId: string) => {
    if (destCategoryId !== '') {
      moveNotes(sourceNoteIds, destCategoryId);
    }
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        aria-label="メモ移動ダイアログを表示"
        tooltipText="メモの移動"
        onClick={open}
      >
        <MoveNoteIcon fontSize={size} />
      </ActivatorButton>
      <MoveNotesDialog
        isOpen={isOpen}
        onClose={close}
        categories={categories}
        onMove={handleMove}
      />
    </>
  );
};

export const OpenMoveNotesDialogButton = Component;
