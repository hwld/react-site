import React, { useState, useContext } from 'components/page/searchNotesPage/node_modules/react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from 'components/page/searchNotesPage/node_modules/@material-ui/core';
import GenreTreeList from 'components/GenreTreeList';
import GenresContext from 'context/GenresContext';
import styled from 'styled-components';

interface SelectGenreButtonprops {
  selectGenreId: (id: string) => void;
}

const StyledGenreTreeList = styled(GenreTreeList)`
  height: 50vh;
`;

const SelectGenreButton: React.FC<SelectGenreButtonprops> = ({
  selectGenreId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { genres } = useContext(GenresContext);
  const [selectedGenreId, setSelectedGenreId] = useState('');

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const selectListItem = (id: string) => {
    setSelectedGenreId(id);
  };

  const select = () => {
    selectGenreId(selectedGenreId);
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={openDialog}>
        選択
      </Button>
      <Dialog open={isOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>検索するジャンルの選択</DialogTitle>
        <DialogContent>
          <StyledGenreTreeList genres={genres} onGenreSelect={selectListItem} />
        </DialogContent>
        <DialogActions>
          <Button onClick={select} variant="contained" color="secondary">
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
