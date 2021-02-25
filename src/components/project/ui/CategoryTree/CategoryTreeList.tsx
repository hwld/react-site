import React, { useCallback, useMemo, forwardRef } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import { TreeView, TreeViewProps } from '../../../ui/TreeView/TreeView';
import { CategoryTreeItem } from './CategoryTreeItem';
import { Category } from '../../../../services/categories';
import { categoriesCompareFunction } from '../../../../util/compareFunctions';

// Categoryの表示用Node
export type CategoryTreeNode = Category & {
  childrenCategories: CategoryTreeNode[];
};

type Props = {
  categories: Category[];
  className?: string;
  multiple?: boolean;
  selectedCategoryIds?: string[];
  focused?: TreeViewProps['focused'];
  onSetFocused?: TreeViewProps['onSetFocused'];
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
      focused,
      onSetFocused,
    },
    ref,
  ) {
    // Categoryを表示用のNodeに変換する関数
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
      [categories],
    );

    // 表示用のCategoryNodeからReactNodeを構築する関数
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

    // 受け取ったcategoriesのReactNode
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
    }, [buildCategoryTreeItems, buildCategoryTreeNode, categories]);

    return (
      <TreeView
        multiSelect={multiple}
        className={className}
        selected={selectedCategoryIds}
        expanded={expanded}
        onExpand={onExpand}
        onNodeSelect={onCategorySelect}
        focused={focused}
        onSetFocused={onSetFocused}
        draggable={draggable}
        onDrop={onCategoryDrop}
        onKeyDown={onKeyDown}
        ref={ref}
      >
        {categories.length !== 0 ? (
          categoryTreeItems
        ) : (
          <Alert className="alert" severity="warning">
            カテゴリーが存在しません
          </Alert>
        )}
      </TreeView>
    );
  },
);

const StyledComponent = styled(Component)`
  height: 100%;
  overflow: auto;
  word-break: keep-all;

  & .alert {
    margin: 20px auto;
    width: 80%;
  }
`;

export const CategoryTreeList = StyledComponent;
