import { DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import styled, { css } from 'styled-components';
import { CategoryField } from '../../../../services/categories';
import { ApplyButton } from '../../ui/ApplyButton';
import { CancelButton } from '../../ui/CancelButton';
import { CategoryForm } from '../../ui/CategoryForm';
import { OperationDialog } from '../OperationDialog';

type Props = {
  className?: string;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  onAddCategory: (field: CategoryField) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  isMobile,
  onClose,
  onAddCategory,
}) => {
  const formId = 'addCategoryForm';

  return (
    <OperationDialog
      className={className}
      open={isOpen}
      isMobile={isMobile}
      onClose={onClose}
    >
      <DialogTitle>カテゴリーの追加</DialogTitle>

      <DialogContent className="dialogContent">
        <CategoryForm id={formId} onSubmit={onAddCategory} />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="追加" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const AddCategoryDialog = styled(Component)`
  .dialogContent {
    ${props =>
      props.isMobile &&
      css`
        padding: 8px 10px;
      `}
  }
`;
