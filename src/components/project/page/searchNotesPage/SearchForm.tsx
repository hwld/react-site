import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { SearchNotesCriteria } from '../../../../services/notes';
import { SelectCategoryField } from '../../operation/selectCategory/SelectCategoryField';
import { IconButton } from '../../../ui/IconButton';

type Props = {
  className?: string;
  search: (criteria: SearchNotesCriteria) => void;
};

const Component: React.FC<Props> = ({ className, search }) => {
  const { categories } = useCategoriesContext();

  const [targetCategoryId, setTargetCategoryId] = useState('');
  const [targetCategoryName, setTargetCategoryName] = useState('');

  const [targetTitle, setTargetTitle] = useState('');
  const [targetText, setTargetText] = useState('');

  const onSearch = () => {
    search({
      categoryId: targetCategoryId,
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

  // カテゴリー
  const selectTargetCategory = (id: string) => {
    setTargetCategoryId(id);
    let categoryName = categories.find(category => category.id === id)
      ?.categoryName;
    if (!categoryName) categoryName = '';
    setTargetCategoryName(categoryName);
  };

  const clearSelectedCategoryId = () => {
    selectTargetCategory('');
  };

  return (
    <div className={className}>
      <Typography className="criteriaTitle">検索条件</Typography>
      <div className="criteriaContent">
        <SelectCategoryField
          selectedCategoryName={targetCategoryName}
          selectedCategoryId={targetCategoryId}
          selectCategoryId={selectTargetCategory}
          clearSelectedCategoryId={clearSelectedCategoryId}
          className="criteriaTextField"
        />
      </div>
      <div className="criteriaContent">
        <TextField
          className="criteriaTextField"
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
          fullWidth
        />
      </div>
      <div className="criteriaContent">
        <TextField
          className="criteriaTextField"
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
          fullWidth
        />
      </div>
      <div className="criteriaAction">
        <Button
          variant="contained"
          color="secondary"
          onClick={onSearch}
          data-testid="searchButton"
        >
          検索
        </Button>
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 16px 24px;

  & > .criteriaTitle {
    font-size: 1.5rem;
  }

  & > .criteriaContent {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    & .criteriaTextField {
      & label.Mui-focused,
      & .MuiFormLabel-root {
        color: ${props => props.theme.palette.secondary.main};
      }

      & .MuiFilledInput-input:-webkit-autofill {
        box-shadow: 0 0 0 100px ${props => props.theme.palette.primary.main}e5
          inset;
      }
    }
  }

  & > .criteriaAction {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;

export const SearchForm = StyledComponent;
