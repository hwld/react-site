import React from 'react';
import { AddCategoryDialog } from '../../operation/addCategory/AddCategoryDialog';
import { RemoveCategoriesDialog } from '../../operation/removeCategories/RemoveCategoriesDIalog';
import { UpdateCategoryDialog } from '../../operation/updateCategory/UpdateCategoryDialog';

interface CategoriesViewMenuProps {
  selectedCategoryIds: string[];
}

const CategoriesViewMenu: React.FC<CategoriesViewMenuProps> = ({
  selectedCategoryIds,
}) => {
  return (
    <>
      <AddCategoryDialog
        disabled={selectedCategoryIds.length > 1}
        parentCategoryId={selectedCategoryIds[0] || ''}
      />
      <RemoveCategoriesDialog
        disabled={selectedCategoryIds.length === 0}
        targetCategoryIds={selectedCategoryIds}
      />
      <UpdateCategoryDialog
        disabled={selectedCategoryIds.length !== 1}
        defaultCategoryId={selectedCategoryIds[0] || ''}
      />
    </>
  );
};

export { CategoriesViewMenu };
