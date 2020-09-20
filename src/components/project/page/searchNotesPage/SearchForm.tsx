import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { useGenresContext } from '../../../../context/GenresContext';
import { SelectGenreDialog } from './SelectGenreDialog';
import { SearchNotesCriteria } from '../../../../services/useNoteStoreService';


const Root = styled.div`
  padding: 16px 24px;
`;

const CriteriaTitle = styled(Typography)`
  font-size: 1.5rem;
`;

const CriteriaContent = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const CriteriaTextField = styled(TextField)`
  & label.Mui-focused,
  .MuiFormLabel-root {
    color: ${props => props.theme.palette.secondary.main};
  }

  & .MuiFilledInput-input:-webkit-autofill {
    box-shadow: 0 0 0 100px ${props => props.theme.palette.primary.main}e5 inset;
  }
`;

const CriteriaAction = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

type SearchFormprops = {
  search: (criteria: SearchNotesCriteria) => void;
};

const SearchForm: React.FC<SearchFormprops> = ({ search }) => {
  const { genres } = useGenresContext();

  const [targetGenreId, setTargetGenreId] = useState('');
  const [targetGenreName, setTargetGenreName] = useState('');

  const [targetTitle, setTargetTitle] = useState('');
  const [targetText, setTargetText] = useState('');

  const onSearch = () => {
    search({
      genreId: targetGenreId,
      title: targetTitle,
      text: targetText,
    });
  };

  // タイトル
  const changeTargetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetTitle(event.target.value);
  };
  const clearTargetTitle = () => {
    setTargetTitle('');
  };

  // 本文
  const changeTargetText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetText(event.target.value);
  };
  const clearTargetText = () => {
    setTargetText('');
  };

  // ジャンル
  const selectGenreId = (id: string) => {
    setTargetGenreId(id);
    let genreName = genres.find(genre => genre.id === id)?.genreName;
    if (!genreName) genreName = '';
    setTargetGenreName(genreName);
  };
  const clearSelectGenreId = () => {
    selectGenreId('');
  };

  return (
    <Root>
      <CriteriaTitle>検索条件</CriteriaTitle>
      <CriteriaContent>
        <CriteriaTextField
          id="searchFormGenreName"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={clearSelectGenreId}>
                  <ClearIcon color="secondary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="ジャンル名"
          value={targetGenreName}
          color="secondary"
          variant="outlined"
        />
        <SelectGenreDialog
          defaultSelectedGenreId={targetGenreId}
          selectGenreId={selectGenreId}
        />
      </CriteriaContent>
      <CriteriaContent>
        <CriteriaTextField
          id="searchFormTitle"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={clearTargetTitle}>
                  <ClearIcon color="secondary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="タイトル"
          value={targetTitle}
          onChange={changeTargetTitle}
          color="secondary"
          variant="filled"
          fullWidth
        />
      </CriteriaContent>
      <CriteriaContent>
        <CriteriaTextField
          id="searchFormText"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={clearTargetText}>
                  <ClearIcon color="secondary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="メモ"
          value={targetText}
          onChange={changeTargetText}
          color="secondary"
          variant="filled"
          fullWidth
        />
      </CriteriaContent>
      <CriteriaAction>
        <Button
          variant="contained"
          color="secondary"
          onClick={onSearch}
          data-testid="searchButton"
        >
          検索
        </Button>
      </CriteriaAction>
    </Root>
  );
};

export { SearchForm };
