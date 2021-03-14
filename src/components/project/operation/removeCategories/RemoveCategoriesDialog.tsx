import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { OperationDialog } from '../OperationDialog';

type Props = {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  onRemoveCategories: (event: React.SyntheticEvent) => void;
};

const Component: React.FC<Props> = ({
  isOpen,
  isMobile,
  onClose,
  onRemoveCategories,
}) => {
  return (
    <OperationDialog open={isOpen} isMobile={isMobile} onClose={onClose}>
      <DialogTitle>カテゴリーの削除</DialogTitle>

      <DialogContent>
        <DialogContentText color="textPrimary">
          削除してよろしいですか？
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="削除" onClick={onRemoveCategories} />
      </DialogActions>
    </OperationDialog>
  );
};

export const RemoveCategoriesDialog = Component;
