import { TextField, InputAdornment } from '@material-ui/core';
import React, { useMemo } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import { IconButton } from '../../../ui/IconButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { SelectCategoryDialog } from './SelectCategoryDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';

type Props = {
  selectedCategoryId: string;
  selectCategoryId: (id: string) => void;
  className?: string;
};

const Component: React.FC<Props> = ({
  selectedCategoryId,
  selectCategoryId,
  className,
}) => {
  const { isOpen, open, close } = useOpener(false);
  const { categories } = useCategoriesContext();

  const categoryName = useMemo(() => {
    const name = categories.find(c => c.id === selectedCategoryId)
      ?.categoryName;
    if (!name) return '';

    return name;
  }, [categories, selectedCategoryId]);

  const handleClickClear = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    selectCategoryId('');
  };

  const handleSelectCategory = (id: string) => {
    selectCategoryId(id);
    close();
  };

  return (
    <>
      <TextField
        className={className}
        onClick={open}
        id="searchFormCategoryName"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickClear}>
                <ClearIcon color="secondary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="カテゴリーの選択"
        value={categoryName}
        variant="outlined"
      />
      <SelectCategoryDialog
        isOpen={isOpen}
        onClose={close}
        categories={categories}
        defaultSelectedId={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
      />
    </>
  );
};

const StyledComponent = styled(Component)`
  /*  常に文字が上に表示されるようにする */
  & > .MuiFormLabel-root {
    transform: translate(14px, -8px) scale(1);
    background-color: ${props => props.theme.palette.primary.main};
  }
`;

export const SelectCategoryField = StyledComponent;
