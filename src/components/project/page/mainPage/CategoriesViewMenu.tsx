import React from 'react';
import { AddCategoryButton } from '../../operation/addCategory/AddCategoryButton';
import { RemoveCategoriesButton } from '../../operation/removeCategories/RemoveCategoriesButton';
import { UpdateCategoryButton } from '../../operation/updateCategory/UpdateCategoryButton';

type Props = {
  selectedCategoryIds: string[];
};

const Component: React.FC<Props> = ({ selectedCategoryIds }) => {
  return (
    <>
      <AddCategoryButton
        disabled={selectedCategoryIds.length > 1}
        parentCategoryId={selectedCategoryIds[0] || ''}
      />
      <RemoveCategoriesButton
        disabled={selectedCategoryIds.length === 0}
        targetCategoryIds={selectedCategoryIds}
      />
      <UpdateCategoryButton
        disabled={selectedCategoryIds.length !== 1}
        defaultCategoryId={selectedCategoryIds[0] || ''}
      />
    </>
  );
};

export const CategoriesViewMenu = Component;
