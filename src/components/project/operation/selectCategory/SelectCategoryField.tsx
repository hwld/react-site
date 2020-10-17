import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import { OperationDialog } from '../OperationDialog';
import { SelectCategoryDialogContent } from './SelectCategoryDialogContent';
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
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useCategoriesContext();
  const [internalSelected, setInternalSelected] = useState('');

  const select = () => {
    selectCategoryId(internalSelected);
    setIsOpen(false);
  };

  const handleClickActivator = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setInternalSelected(selectedCategoryId);
    setIsOpen(true);
  };

  const handleClickClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    clearSelectedCategoryId();
  };

  return (
    <OperationDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="検索するカテゴリーの選択"
      doneText="選択"
      onDone={select}
      activator={
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
          color="secondary"
          variant="outlined"
        />
      }
    >
      <SelectCategoryDialogContent
        categories={categories}
        selectedCategoryId={internalSelected}
        selectCategoryId={setInternalSelected}
      />
    </OperationDialog>
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
