import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import styled from 'styled-components';
import GenreTreeList from '../../ui/GenreTreeList';
import { useGenresContext } from '../../../../context/GenresContext';

const StyledGenreTreeList = styled(GenreTreeList)`
  height: 50vh;
`;

type SelectGenreButtonprops = {
  selectGenreId: (id: string) => void;
  defaultSelectedGenreId: string;
};

const SelectGenreButton: React.FC<SelectGenreButtonprops> = ({
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
        <DialogTitle>検索するジャンルの選択</DialogTitle>
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
            選択
          </Button>
          <Button onClick={closeDialog} variant="contained" color="secondary">
            中止
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SelectGenreButton;
