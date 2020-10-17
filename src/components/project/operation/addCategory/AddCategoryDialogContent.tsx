import { DialogContent } from '@material-ui/core';
import React from 'react';
import { CategoryField } from '../../../../services/categories';
import { EditCategoryField } from '../../ui/EditCategoryFields';

type Props = {
  className?: string;
  categoryField: CategoryField;
  onChange: (fieldName: keyof CategoryField, value: string) => void;
};

const Component: React.FC<Props> = ({ className, categoryField, onChange }) => {
  return (
    <DialogContent className={className}>
      <EditCategoryField categoryField={categoryField} onChange={onChange} />
    </DialogContent>
  );
};

export const AddCategoryDialogContent = Component;
