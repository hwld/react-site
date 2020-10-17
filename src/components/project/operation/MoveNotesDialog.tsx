import React, { useState } from 'react';
import {
  DialogContent,
  SvgIconProps,
  DialogContentText,
} from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import styled from 'styled-components';
import { OperationDialog } from './OperationDialog';
import { useCategoriesContext } from '../../../context/CategoriesContext';
import { CategoryTreeList } from '../ui/CategoryTreeList';
import { useNotesContext } from '../../../context/NotesContext';

const StyledCategoryTreeList = styled(CategoryTreeList)`
  height: 50vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

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
      <DialogContent>
        <DialogContentText color="textPrimary">
          移動先カテゴリー
        </DialogContentText>
        <StyledCategoryTreeList
          categories={categories}
          selectedCategoryIds={[destCategoryId]}
          onCategorySelect={selectCategory}
        />
      </DialogContent>
    </OperationDialog>
  );
};

export { MoveNotesDialog };
