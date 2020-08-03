import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import AutoComplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { UseAutocompleteProps } from '@material-ui/lab/useAutocomplete';
import { useGenresContext } from '../../../../context/GenresContext';
import { SelectGenreDialog } from './SelectGenreDialog';
import { useNotesContext } from '../../../../context/NotesContext';
import { SearchNotesCriteria } from '../../../../types/note';

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

// https://github.com/styled-components/styled-components/issues/1803
// よくわからないけど、styledでラップするとgenericが解決できないっぽい
// AutoCompleteのgenericはoptionの型っぽいので無理やりstringに固定して使う.
// Optionの型を変更すると動かなくなる
const StringAutoComplete = AutoComplete as React.FC<
  AutocompleteProps<string> & UseAutocompleteProps<string>
>;
const CriteriaAutoComplete = styled(StringAutoComplete)`
  width: 100%;
  & .MuiAutocomplete-popupIndicator,
  .MuiAutocomplete-clearIndicator {
    color: ${props => props.theme.palette.secondary.main};
  }
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
  const { notes } = useNotesContext();

  const [targetGenreId, setTargetGenreId] = useState('');
  const [targetGenreName, setTargetGenreName] = useState('');

  const [targetTitle, setTargetTitle] = useState('');
  const [targetText, setTargetText] = useState('');
  const [targetAuthorName, setTargetAuthorName] = useState('');
  const [targetBookName, setTargetBookName] = useState('');

  const onSearch = () => {
    search({
      genreId: targetGenreId,
      title: targetTitle,
      text: targetText,
      authorName: targetAuthorName,
      bookName: targetBookName,
    });
  };

  // 重複のないリストを作成
  const authorNameList = Array.from(
    new Set(
      notes.filter(note => note.authorName !== '').map(note => note.authorName),
    ),
  );
  const bookNameList = Array.from(
    new Set(
      notes.filter(note => note.bookName !== '').map(note => note.bookName),
    ),
  );

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

  // 著者名
  const selectTargetAuthorName = (event: object, value: string | null) => {
    setTargetAuthorName(value || '');
  };
  const changeTargetAuthorName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTargetAuthorName(event.target.value);
  };

  // 書籍名
  const selectTargetBookName = (event: object, value: string | null) => {
    setTargetBookName(value || '');
  };
  const changeTargetBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetBookName(event.target.value);
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
      <CriteriaContent>
        <CriteriaAutoComplete
          data-testid="authorNameField"
          options={authorNameList}
          onChange={selectTargetAuthorName}
          renderInput={params => (
            <CriteriaTextField
              {...params}
              id="searchFormAuthorName"
              label="著者名"
              onChange={changeTargetAuthorName}
              color="secondary"
              variant="filled"
              fullWidth
            />
          )}
        />
      </CriteriaContent>
      <CriteriaContent>
        <CriteriaAutoComplete
          data-testid="bookNameField"
          options={bookNameList}
          onChange={selectTargetBookName}
          renderInput={params => (
            <CriteriaTextField
              {...params}
              id="searchFormBookName"
              label="書籍名"
              onChange={changeTargetBookName}
              color="secondary"
              variant="filled"
              fullWidth
            />
          )}
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
