import { DialogContent, DialogContentText } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { Category } from '../../../../services/categories';
import { CategoryTreeList } from '../../ui/CategoryTreeList';

type Props = {
  className?: string;
  categories: Category[];
  destCategoryId: string;
  onCategorySelect: (ids: string[]) => void;
};

const Component: React.FC<Props> = ({
  className,
  categories,
  destCategoryId,
  onCategorySelect,
}) => {
  return (
    <DialogContent className={className}>
      <DialogContentText color="textPrimary">
        移動先カテゴリー
      </DialogContentText>
      <CategoryTreeList
        className={`${className}_categoryTreeList`}
        categories={categories}
        selectedCategoryIds={[destCategoryId]}
        onCategorySelect={onCategorySelect}
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

export const MoveNotesDialogContent = StyledComponent;
