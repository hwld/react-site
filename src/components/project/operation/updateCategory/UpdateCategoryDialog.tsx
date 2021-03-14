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
  defaultField?: CategoryField;
  onUpdateCategory: (field: CategoryField) => void;
};

const Component: React.FC<Props> = ({
  className,
  isOpen,
  isMobile,
  onClose,
  defaultField,
  onUpdateCategory,
}) => {
  const formId = 'updateCategoryForm';

  return (
    <OperationDialog
      className={className}
      open={isOpen}
      isMobile={isMobile}
      onClose={onClose}
    >
      <DialogTitle>カテゴリーの編集</DialogTitle>

      <DialogContent className="dialogContent">
        <CategoryForm
          id={formId}
          defaultField={defaultField}
          onSubmit={onUpdateCategory}
        />
      </DialogContent>

      <DialogActions>
        <CancelButton text="中止" onClick={onClose} />
        <ApplyButton text="変更" type="submit" form={formId} />
      </DialogActions>
    </OperationDialog>
  );
};

export const UpdateCategoryDialog = styled(Component)`
  .dialogContent {
    ${props =>
      props.isMobile &&
      css`
        padding: 8px 10px;
      `}
  }
`;
