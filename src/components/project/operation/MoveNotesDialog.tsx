import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  SvgIconProps,
  DialogContentText,
} from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import styled from 'styled-components';
import OperationDialog from './OperationDialog';
import { useGenresContext } from '../../../context/GenresContext';
import GenreTreeList from '../ui/GenreTreeList';
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

  const { moveNote } = useNotesContext();

  const moveNotes = () => {
    sourceNoteIds.forEach(id => moveNote(id, destGenreId));
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
      onDone={moveNotes}
      onOpen={clearDestGenre}
      data-testid="moveNotesDialog"
    >
      <DialogTitle>メモの移動</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          移動先ジャンル
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

export default MoveNotesDialog;
