import { DialogContent, DialogContentText } from '@material-ui/core';
import React from 'react';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  return (
    <DialogContent className={className}>
      <DialogContentText color="textPrimary">
        削除してよろしいですか？
      </DialogContentText>
    </DialogContent>
  );
};

export const RemoveNotesDialogContent = Component;
