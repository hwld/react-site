import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Genre } from 'stores/store';
import { RootState } from 'stores';
import { useSelector } from 'react-redux';
import TreeView from './util/TreeVIew/TreeView';
import TreeItem from './util/TreeVIew/TreeItem';

export type GenreTreeNode = Genre & { childrenGenres: GenreTreeNode[] };

interface GenreTreeListProps {
  onGenreSelect: (selectedId: string) => void;
  className?: string;
}

const StyledTreeView = styled(TreeView)`
  overflow: auto;
  word-break: keep-all;
`;

const GenreTreeList: React.FC<GenreTreeListProps> = ({
  onGenreSelect,
  className,
}) => {
  const { genres } = useSelector((state: RootState) => state.reactNotes);

  const buildGenreTreeNode = useCallback(
    (rawGenre: Genre): GenreTreeNode => {
      // rawGenreの子ジャンルを抽出
      const childrenGenres = genres.filter(
        genre => genre.parentGenreId === rawGenre.id,
      );

      // childrenGenresそれぞれのGenreTreeNodeを作成
      const childrenGenreTreeNodes = childrenGenres.map(genre =>
        buildGenreTreeNode(genre),
      );

      return {
        ...rawGenre,
        childrenGenres: [...childrenGenreTreeNodes],
      };
    },
    [genres],
  );

  const buildGenreTreeItems = useCallback(
    (genreTreeNode: GenreTreeNode): React.ReactNode => {
      return (
        <TreeItem
          nodeId={genreTreeNode.id}
          label={genreTreeNode.genreName}
          key={genreTreeNode.id}
        >
          {genreTreeNode.childrenGenres.length === 0
            ? null
            : genreTreeNode.childrenGenres.map(node =>
                buildGenreTreeItems(node),
              )}
        </TreeItem>
      );
    },
    [],
  );

  const renderGenreTree = useCallback((): React.ReactNode => {
    // ルートジャンルを取得する
    const rootGenres = genres.filter(genre => genre.parentGenreId === '');

    // ルートジャンルそれぞれのGenreTreeNodeを作成する
    const treeObject = rootGenres.map(genre => buildGenreTreeNode(genre));

    // GenreTreeNodeをReactNodeに変換する
    return treeObject.map(obj => buildGenreTreeItems(obj));
  }, [genres, buildGenreTreeNode, buildGenreTreeItems]);

  return (
    <StyledTreeView
      className={className}
      onNodeSelect={(genreId: string) => {
        onGenreSelect(genreId);
      }}
    >
      {renderGenreTree()}
    </StyledTreeView>
  );
};

export default GenreTreeList;
