import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  SvgIconProps,
  DialogContentText,
} from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import styled from 'styled-components';
import { OperationDialog } from './OperationDialog';
import { useGenresContext } from '../../../context/CategoriesContext';
import { GenreTreeList } from '../ui/CategoryTreeList';
import { useNotesContext } from '../../../context/NotesContext';

const StyledGenreTreeList = styled(GenreTreeList)`
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
  const { genres } = useGenresContext();
  const [destGenreId, setDestGenreId] = useState('');

  const { moveNotes } = useNotesContext();

  const move = () => {
    moveNotes(sourceNoteIds, destGenreId);
  };

  const selectGenre = (ids: string[]) => {
    setDestGenreId(ids[0] || '');
  };

  const clearDestGenre = () => {
    setDestGenreId('');
  };

  return (
    <OperationDialog
      tooltipText="メモを移動"
      activatorIcon={<MoveNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="移動"
      onDone={move}
      onOpen={clearDestGenre}
      data-testid="moveNotesDialog"
    >
      <DialogTitle>メモの移動</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          移動先カテゴリー
        </DialogContentText>
        <StyledGenreTreeList
          genres={genres}
          selectedGenreIds={[destGenreId]}
          onGenreSelect={selectGenre}
        />
      </DialogContent>
    </OperationDialog>
  );
};

export { MoveNotesDialog };
