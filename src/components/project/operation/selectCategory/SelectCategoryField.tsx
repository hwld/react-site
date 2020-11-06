import { TextField, InputAdornment } from '@material-ui/core';
import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import { IconButton } from '../../../ui/IconButton';
import { useDialog } from '../../../../util/hooks/useDialog';
import { SelectCategoryDialog } from './SelectCategoryDialog';
import { useCategoriesContext } from '../../../../context/CategoriesContext';

type Props = {
  selectedCategoryName: string;
  selectedCategoryId: string;
  selectCategoryId: (id: string) => void;
  clearSelectedCategoryId: () => void;
  className?: string;
};

const Component: React.FC<Props> = ({
  selectedCategoryName,
  selectedCategoryId,
  selectCategoryId,
  clearSelectedCategoryId,
  className,
}) => {
  const { isOpen, open, close } = useDialog(false);
  const { categories } = useCategoriesContext();

  const handleClickActivator = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    open();
  };

  const handleClickClear = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    clearSelectedCategoryId();
  };

  const handleSelectCategory = (id: string) => {
    selectCategoryId(id);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
  };

  return (
    <>
      <TextField
        className={className}
        onClick={handleClickActivator}
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
        label="カテゴリー名"
        value={selectedCategoryName}
        variant="outlined"
        data-testid="activatorButton"
      />
      <SelectCategoryDialog
        isOpen={isOpen}
        onClose={close}
        categories={categories}
        defaultSelectedId={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
        onCancel={handleCancel}
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
