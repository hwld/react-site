import React, { useCallback, useMemo, forwardRef } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import { TreeView } from '../../ui/TreeView/TreeView';
import { CategoryTreeItem } from './CategoryTreeItem';
import { Category } from '../../../services/categories';

export type CategoryTreeNode = Category & {
  childrenCategories: CategoryTreeNode[];
};

const StyledTreeView = styled(TreeView)`
  height: 100%;
  overflow: auto;
  word-break: keep-all;
`;

const StyledAlert = styled(Alert)`
  margin: 20px auto;
  width: 80%;
`;

type Props = {
  categories: Category[];
  className?: string;
  multiple?: boolean;
  selectedCategoryIds?: string[];
  expanded?: string[];
  onExpand?: (expandedIds: string[]) => void;
  onCategorySelect?: (selectedId: string[]) => void;
  draggable?: boolean;
  onCategoryDrop?: (sourceId: string[], targetId: string) => void;
  onNotesDrop?: (noteIds: string[], destCategoryId: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

const Component = forwardRef<HTMLUListElement, React.PropsWithChildren<Props>>(
  function CategoryTreeList(
    {
      multiple,
      categories,
      selectedCategoryIds = [],
      expanded,
      onExpand = () => {},
      onCategorySelect = () => {},
      draggable = false,
      onCategoryDrop,
      onNotesDrop,
      onKeyDown,
      className,
    },
    ref,
  ) {
    // 同じ親を持つcategoryを作成順に並び替える.
    // そのうち並び順を指定できるようにするかも.
    const categoriesCompareFunction = useCallback(() => {
      return (categoryA: Category, categoryB: Category) => {
        if (categoryA.createdAt.getTime() > categoryB.createdAt.getTime()) {
          return 1;
        }
        if (categoryA.createdAt.getTime() < categoryB.createdAt.getTime()) {
          return -1;
        }

        return 0;
      };
    }, []);

    const buildCategoryTreeNode = useCallback(
      (rawCategory: Category): CategoryTreeNode => {
        // rawCategoryの子カテゴリーを抽出
        const childrenCategories = categories.filter(
          category => category.parentCategoryId === rawCategory.id,
        );

        // childrenCategoriesそれぞれのCategoryTreeNodeを作成
        const childrenCategoryTreeNodes = childrenCategories
          .sort(categoriesCompareFunction())
          .map(category => buildCategoryTreeNode(category));

        return {
          ...rawCategory,
          childrenCategories: [...childrenCategoryTreeNodes],
        };
      },
      [categories, categoriesCompareFunction],
    );

    const buildCategoryTreeItems = useCallback(
      (categoryTreeNode: CategoryTreeNode): React.ReactNode => {
        return (
          <CategoryTreeItem
            nodeId={categoryTreeNode.id}
            categoryName={categoryTreeNode.categoryName}
            key={categoryTreeNode.id}
            onNotesDrop={onNotesDrop}
          >
            {categoryTreeNode.childrenCategories.length === 0
              ? null
              : categoryTreeNode.childrenCategories.map(node =>
                  buildCategoryTreeItems(node),
                )}
          </CategoryTreeItem>
        );
      },
      [onNotesDrop],
    );

    const categoryTreeItems = useMemo(() => {
      // ルートカテゴリーを取得する
      const rootCategories = categories.filter(
        category => category.parentCategoryId === '',
      );

      // ルートカテゴリーそれぞれのCategoryTreeNodeを作成する
      const treeObject = rootCategories
        .sort(categoriesCompareFunction())
        .map(category => buildCategoryTreeNode(category));

      // CategoryTreeNodeをReactNodeに変換する
      return treeObject.map(obj => buildCategoryTreeItems(obj));
    }, [
      buildCategoryTreeItems,
      buildCategoryTreeNode,
      categories,
      categoriesCompareFunction,
    ]);

    return (
      <StyledTreeView
        multiSelect={multiple}
        className={className}
        selected={selectedCategoryIds}
        expanded={expanded}
        onExpand={onExpand}
        onNodeSelect={onCategorySelect}
        draggable={draggable}
        onDrop={onCategoryDrop}
        onKeyDown={onKeyDown}
        ref={ref}
      >
        {categories.length !== 0 ? (
          categoryTreeItems
        ) : (
          <StyledAlert severity="warning">カテゴリーが存在しません</StyledAlert>
        )}
      </StyledTreeView>
    );
  },
);

export const CategoryTreeList = Component;
