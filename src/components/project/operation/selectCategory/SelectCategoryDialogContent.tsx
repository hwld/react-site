import { DialogContent } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Category } from '../../../../services/categories';
import { CategoryTreeList } from '../../ui/CategoryTreeList';

type Props = {
  className?: string;
  categories: Category[];
  selectedCategoryId: string;
  selectCategoryId: (id: string) => void;
};

const Component: React.FC<Props> = ({
  className,
  categories,
  selectedCategoryId,
  selectCategoryId: singleSelect,
}) => {
  const selectCategoryId = (ids: string[]) => {
    singleSelect(ids[0] || '');
  };

  return (
    <DialogContent className={className}>
      <CategoryTreeList
        className={`${className}_categoryTreeList`}
        categories={categories}
        selectedCategoryIds={[selectedCategoryId]}
        onCategorySelect={selectCategoryId}
      />
    </DialogContent>
  );
};

const StyledComponent = styled(Component)`
  &_categoryTreeList {
    height: 50vh;
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

export const SelectCategoryDialogContent = StyledComponent;
