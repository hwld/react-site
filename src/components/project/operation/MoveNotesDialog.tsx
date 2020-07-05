import React, { useState, useContext } from 'react';
import {
  DialogTitle,
  DialogContent,
  SvgIconProps,
  DialogContentText,
} from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import styled from 'styled-components';
import OperationDialog from './OperationDialog';
import GenresContext from '../../../context/GenresContext';
import GenreTreeList from '../ui/GenreTreeList';
import NotesContext from '../../../context/NotesContext';

interface MoveNotesDialogProps {
  disabled?: boolean;
  sourceNoteIds: string[];
  size?: SvgIconProps['fontSize'];
}

const StyledGenreTreeList = styled(GenreTreeList)`
  height: 50vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const MoveNotesDialog: React.FC<MoveNotesDialogProps> = ({
  disabled,
  sourceNoteIds,
  size,
}) => {
  const { genres } = useContext(GenresContext);
  const [destGenreId, setDestGenreId] = useState('');

  const { moveNote } = useContext(NotesContext);

  const moveNotes = () => {
    sourceNoteIds.forEach(id => moveNote(id, destGenreId));
  };

  const selectGenre = (ids: string[]) => {
    setDestGenreId(ids[0] || '');
  };

  return (
    <OperationDialog
      tooltipText="メモを移動"
      activatorIcon={<MoveNoteIcon fontSize={size} />}
      activatorDisabled={disabled}
      doneText="移動"
      onDone={moveNotes}
      onClose={() => {
        setDestGenreId('');
      }}
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
