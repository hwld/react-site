import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import { CategoryTreeList } from '../../ui/CategoryTreeList';
import { useCategoriesContext } from '../../../../context/CategoriesContext';

const StyledCategoryTreeList = styled(CategoryTreeList)`
  height: 50vh;
`;

type SelectCategoryDialogProps = {
  selectCategoryId: (id: string) => void;
  defaultSelectedCategoryId: string;
};

const SelectCategoryDialog: React.FC<SelectCategoryDialogProps> = ({
  selectCategoryId,
  defaultSelectedCategoryId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { categories } = useCategoriesContext();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const openDialog = () => {
    setSelectedCategoryId(defaultSelectedCategoryId);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const selectListItem = (ids: string[]) => {
    setSelectedCategoryId(ids[0] || '');
  };

  const select = () => {
    selectCategoryId(selectedCategoryId);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={openDialog}
        data-testid="activator"
      >
        選択
      </Button>
      <Dialog open={isOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>検索するカテゴリーの選択</DialogTitle>
        <DialogContent>
          <StyledCategoryTreeList
            categories={categories}
            selectedCategoryIds={[selectedCategoryId]}
            onCategorySelect={selectListItem}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={select}
            variant="contained"
            color="secondary"
            data-testid="selectButton"
          >
            <Typography color="textSecondary">選択</Typography>
          </Button>
          <Button onClick={closeDialog} variant="contained" color="secondary">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { SelectCategoryDialog };
