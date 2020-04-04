import React from 'react';
import { SvgIconProps, DialogTitle, DialogContent } from '@material-ui/core';
import SearchNoteIcon from '@material-ui/icons/Search';
import MenuItemDialog from './MenuItemDialog';

interface SearchNoteDialogProps {
  size?: SvgIconProps['fontSize'];
}

const SearchNoteDialog: React.FC<SearchNoteDialogProps> = ({ size }) => {
  return (
    <MenuItemDialog
      tooltipText="ノートを検索する"
      activatorIcon={<SearchNoteIcon fontSize={size} />}
    >
      <DialogTitle>ノートの検索</DialogTitle>
      <DialogContent>Hello</DialogContent>
    </MenuItemDialog>
  );
};

export default SearchNoteDialog;
