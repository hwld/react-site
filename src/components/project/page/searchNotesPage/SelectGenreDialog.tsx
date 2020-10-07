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
import { GenreTreeList } from '../../ui/CategoryTreeList';
import { useGenresContext } from '../../../../context/CategoriesContext';

const StyledGenreTreeList = styled(GenreTreeList)`
  height: 50vh;
`;

type SelectGenreDialogProps = {
  selectGenreId: (id: string) => void;
  defaultSelectedGenreId: string;
};

const SelectGenreDialog: React.FC<SelectGenreDialogProps> = ({
  selectGenreId,
  defaultSelectedGenreId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { genres } = useGenresContext();
  const [selectedGenreId, setSelectedGenreId] = useState('');

  const openDialog = () => {
    setSelectedGenreId(defaultSelectedGenreId);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const selectListItem = (ids: string[]) => {
    setSelectedGenreId(ids[0] || '');
  };

  const select = () => {
    selectGenreId(selectedGenreId);
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
          <StyledGenreTreeList
            genres={genres}
            selectedGenreIds={[selectedGenreId]}
            onGenreSelect={selectListItem}
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

export { SelectGenreDialog };
