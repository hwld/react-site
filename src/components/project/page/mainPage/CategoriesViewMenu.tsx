import React from 'react';
import { OpenAddCategoryDialogButton } from '../../operation/addCategory/OpenAddCategoryDialogButton';
import { OpenRemoveCategoriesDialogButton } from '../../operation/removeCategories/OpenRemoveCategoriesDialogButton';
import { OpenUpdateCategoryDialogButton } from '../../operation/updateCategory/OpenUpdateCategoryDialogButton';

type Props = {
  selectedCategoryIds: string[];
};

const Component: React.FC<Props> = ({ selectedCategoryIds }) => {
  return (
    <>
      <OpenAddCategoryDialogButton
        disabled={selectedCategoryIds.length > 1}
        parentCategoryId={selectedCategoryIds[0] || ''}
      />
      <OpenRemoveCategoriesDialogButton
        disabled={selectedCategoryIds.length === 0}
        targetCategoryIds={selectedCategoryIds}
      />
      <OpenUpdateCategoryDialogButton
        disabled={selectedCategoryIds.length !== 1}
        defaultCategoryId={selectedCategoryIds[0]}
      />
    </>
  );
};

export const CategoriesViewMenu = Component;
