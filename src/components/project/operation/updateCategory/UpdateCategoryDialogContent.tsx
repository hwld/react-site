import { DialogContent } from '@material-ui/core';
import React from 'react';
import { CategoryField } from '../../../../services/categories';
import { EditCategoryFields } from '../../ui/EditCategoryFields';

type Props = {
  className?: string;
  newCategoryField: CategoryField;
  onChangeCategoryField: (
    fieldName: keyof CategoryField,
    value: string,
  ) => void;
};

const Component: React.FC<Props> = ({
  className,
  newCategoryField,
  onChangeCategoryField,
}) => {
  return (
    <DialogContent className={className}>
      <EditCategoryFields
        categoryField={newCategoryField}
        onChange={onChangeCategoryField}
      />
    </DialogContent>
  );
};

export const UpdateCategoryDialogContent = Component;
