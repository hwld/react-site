import React from 'react';
import { AddCategoryDialog } from '../../operation/AddCategoryDialog';
import { RemoveCategoryDialog } from '../../operation/RemoveCategoryDIalog';
import { UpdateCategoryDialog } from '../../operation/UpdateCategoryDialog';

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
      <RemoveCategoryDialog
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
