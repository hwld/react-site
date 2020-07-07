import React, { useContext, useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import AutoComplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import { SearchNotesCriteria } from '../../../../services/notes';
import GenresContext from '../../../../context/GenresContext';
import NotesContext from '../../../../context/NotesContext';
import SelectGenreDialog from './SelectGenreDialog';

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
`;

const CriteriaAction = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

interface SearchFormprops {
  search: (criteria: SearchNotesCriteria) => void;
}

const SearchForm: React.FC<SearchFormprops> = ({ search }) => {
  const { genres } = useContext(GenresContext);
  const { notes } = useContext(NotesContext);

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

  const changeTargetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetTitle(event.target.value);
  };

  const changeTargetText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetText(event.target.value);
  };

  const selectTargetAuthorName = (event: object, value: string | null) => {
    if (value) setTargetAuthorName(value);
  };
  const changeTargetAuthorName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTargetAuthorName(event.target.value);
  };

  const selectTargetBookName = (event: object, value: string | null) => {
    if (value) setTargetBookName(value);
  };
  const changeTargetBookName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetBookName(event.target.value);
  };

  const selectGenreId = (id: string) => {
    setTargetGenreId(id);
    let genreName = genres.find(genre => genre.id === id)?.genreName;
    if (!genreName) genreName = '';
    setTargetGenreName(genreName);
  };

  return (
    <Root>
      <CriteriaTitle>検索条件</CriteriaTitle>
      <CriteriaContent>
        <CriteriaTextField
          id="searchFormGenreName"
          inputProps={{ readOnly: true }}
          label="ジャンル名"
          value={targetGenreName}
          color="secondary"
          variant="filled"
        />
        <SelectGenreDialog selectGenreId={selectGenreId} />
      </CriteriaContent>
      <CriteriaContent>
        <CriteriaTextField
          id="searchFormTitle"
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
          label="メモ"
          value={targetText}
          onChange={changeTargetText}
          color="secondary"
          variant="filled"
          fullWidth
        />
      </CriteriaContent>
      <CriteriaContent>
        <AutoComplete
          // styled-componentsで使うと型がおかしくなるのでインラインで書いた
          style={{ width: '100%' }}
          freeSolo
          options={authorNameList}
          onChange={selectTargetAuthorName}
          disableClearable
          renderInput={params => (
            <CriteriaTextField
              {...params}
              id="searchFormAuthorName"
              label="著者名"
              value={targetAuthorName}
              onChange={changeTargetAuthorName}
              color="secondary"
              variant="filled"
              fullWidth
            />
          )}
        />
      </CriteriaContent>
      <CriteriaContent>
        <AutoComplete
          // styled-componentsで使うと型がおかしくなるのでインラインで書いた
          style={{ width: '100%' }}
          freeSolo
          options={bookNameList}
          onChange={selectTargetBookName}
          disableClearable
          renderInput={params => (
            <CriteriaTextField
              {...params}
              id="searchFormBookName"
              label="書籍名"
              value={targetBookName}
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

export default SearchForm;
