import React, { useState } from 'react';
import styled from 'styled-components';
import { Category } from '../../../services/categories';
import { CategoryTreeList } from './CategoryTreeList';

type Props = {
  id: string;
  categories: Category[];
  defaultSelectedId?: string;
  onSubmit: (selectedId: string) => void;
  className?: string;
};

const Component: React.FC<Props> = ({
  id,
  categories,
  defaultSelectedId,
  onSubmit,
  className,
}) => {
  const [selectedId, setSelectedId] = useState(defaultSelectedId || '');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(selectedId);
  };

  const handleSelect = (ids: string[]) => {
    setSelectedId(ids[0] || '');
  };

  return (
    <form id={id} onSubmit={handleSubmit} className={className}>
      <CategoryTreeList
        className="categoryTreeList"
        categories={categories}
        selectedCategoryIds={[selectedId]}
        onCategorySelect={handleSelect}
      />
    </form>
  );
};

const StyledComponent = styled(Component)`
  & .categoryTreeList {
    height: 50vh;
    background-color: ${props => props.theme.palette.primary.dark};
  }
`;

export const SelectCategoryForm = StyledComponent;
