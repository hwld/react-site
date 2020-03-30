import React from 'react';
import { DialogTitle, DialogContent, SvgIconProps } from '@material-ui/core';
import MoveNoteIcon from '@material-ui/icons/Forward';
import MenuItemDialog from './MenuItemDialog';

interface MoveNotesDialogProps {
  selectedNotesIds: string[];
  size?: SvgIconProps['fontSize'];
}

const MoveNotesDialog: React.FC<MoveNotesDialogProps> = ({
  selectedNotesIds,
  size,
}) => {
  const moveNotes = () => {
    window.console.log('Hello');
  };

  return (
    <>
      <MenuItemDialog
        tooltipText="メモを移動"
        activatorIcon={<MoveNoteIcon fontSize={size} />}
        doneText="移動"
        onDone={moveNotes}
      >
        <DialogTitle>メモの移動</DialogTitle>
        <DialogContent>Hello</DialogContent>
      </MenuItemDialog>
    </>
  );
};

export default MoveNotesDialog;
