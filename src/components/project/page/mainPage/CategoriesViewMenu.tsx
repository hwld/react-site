import React from 'react';
import { AddCategoryButton } from '../../operation/addCategory/AddCategoryButton';
import { RemoveCategoriesButton } from '../../operation/removeCategories/RemoveCategoriesButton';
import { UpdateCategoryButton } from '../../operation/updateCategory/UpdateCategoryButton';

interface CategoriesViewMenuProps {
  selectedCategoryIds: string[];
}

const CategoriesViewMenu: React.FC<CategoriesViewMenuProps> = ({
  selectedCategoryIds,
}) => {
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

export { CategoriesViewMenu };
