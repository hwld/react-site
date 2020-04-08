import React, { useState, useContext } from 'react';
import {
  DialogTitle,
  DialogContent,
  SvgIconProps,
  DialogContentText,
} from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import styled from 'styled-components';
import MenuItemDialog from '../MenuItemDialog';
import GenresContext from '../../context/GenresContext';
import GenreTreeList from '../GenreTreeList';
import NotesContext from '../../context/NotesContext';

interface MoveNotesDialogProps {
  selectedNotesIds: string[];
  size?: SvgIconProps['fontSize'];
}

const StyledGenreTreeList = styled(GenreTreeList)`
  height: 50vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const MoveNotesDialog: React.FC<MoveNotesDialogProps> = ({
  selectedNotesIds,
  size,
}) => {
  const { genres } = useContext(GenresContext);
  const [destGenreId, setDestGenreId] = useState('');

  const { moveNote } = useContext(NotesContext);

  const moveNotes = () => {
    selectedNotesIds.forEach(id => moveNote(id, destGenreId));
  };

  return (
    <MenuItemDialog
      tooltipText="メモを移動"
      activatorIcon={<MoveNoteIcon fontSize={size} />}
      doneText="移動"
      onDone={moveNotes}
    >
      <DialogTitle>メモの移動</DialogTitle>
      <DialogContent>
        <DialogContentText color="textPrimary">
          移動先ジャンル
        </DialogContentText>
        <StyledGenreTreeList genres={genres} onGenreSelect={setDestGenreId} />
      </DialogContent>
    </MenuItemDialog>
  );
};

export default MoveNotesDialog;
