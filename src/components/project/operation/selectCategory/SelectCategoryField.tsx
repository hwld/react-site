import {
  TextField,
  InputAdornment,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import styled from 'styled-components';
import { OperationDialog } from '../OperationDialog';
import { SelectCategoryDialogContent } from './SelectCategoryDialogContent';
import { useCategoriesContext } from '../../../../context/CategoriesContext';
import { IconButton } from '../../../ui/IconButton';
import { useDialog } from '../../../../util/hooks/useDialog';

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
  const [internalSelected, setInternalSelected] = useState('');

  const handleClickActivator = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setInternalSelected(selectedCategoryId);
    open();
  };

  const handleClickClear = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    clearSelectedCategoryId();
  };

  const handleDone = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    selectCategoryId(internalSelected);
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
        color="secondary"
        variant="outlined"
        data-testid="activatorButton"
      />
      <OperationDialog open={isOpen} onClose={close}>
        <DialogTitle>検索するカテゴリーの選択</DialogTitle>
        <SelectCategoryDialogContent
          categories={categories}
          selectedCategoryId={internalSelected}
          selectCategoryId={setInternalSelected}
        />
        <DialogActions>
          <Button onClick={handleDone} data-testid="doneButton">
            <Typography color="textSecondary">選択</Typography>
          </Button>
          <Button onClick={handleCancel} data-testid="cancelButton">
            <Typography color="textSecondary">中止</Typography>
          </Button>
        </DialogActions>
      </OperationDialog>
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
