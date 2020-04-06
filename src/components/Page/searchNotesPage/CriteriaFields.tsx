import React, { useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import AutoComplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import NotesContext from 'context/NotesContext';

interface CriteriaFieldsprops {
  search: () => void;
}

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

const CriteriaFields: React.FC<CriteriaFieldsprops> = ({ search }) => {
  const onSearch = () => {
    search();
  };

  const { notes } = useContext(NotesContext);
  // 重複のないリストを作成
  const authorNameList = Array.from(
    new Set(notes.map(note => note.authorName)),
  );
  const bookNameList = Array.from(new Set(notes.map(note => note.bookName)));

  return (
    <Root>
      <CriteriaTitle>検索条件</CriteriaTitle>
      <CriteriaContent>
        <CriteriaTextField
          inputProps={{ readOnly: true }}
          onClick={() => {
            window.console.log('clidk');
          }}
          label="ジャンル"
          value="ジャンル-1-1"
          color="secondary"
          variant="filled"
        />
        <Button variant="contained" color="secondary">
          選択
        </Button>
      </CriteriaContent>
      <CriteriaContent>
        <CriteriaTextField
          label="タイトル"
          color="secondary"
          variant="filled"
          fullWidth
        />
      </CriteriaContent>
      <CriteriaContent>
        <CriteriaTextField
          label="メモ"
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
          renderInput={params => (
            <CriteriaTextField
              {...params}
              label="著者名"
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
          renderInput={params => (
            <CriteriaTextField
              {...params}
              label="書籍名"
              color="secondary"
              variant="filled"
              fullWidth
            />
          )}
        />
      </CriteriaContent>
      <CriteriaAction>
        <Button variant="contained" color="secondary" onClick={onSearch}>
          検索
        </Button>
      </CriteriaAction>
    </Root>
  );
};

export default CriteriaFields;
