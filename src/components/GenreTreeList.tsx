import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Genre } from 'services/storage/genres';
import TreeView from './util/TreeVIew/TreeView';
import TreeItem from './util/TreeVIew/TreeItem';

export type GenreTreeNode = Genre & { childrenGenres: GenreTreeNode[] };

interface GenreTreeListProps {
  genres: Genre[];
  onGenreSelect: (selectedId: string) => void;
  className?: string;
}

const StyledTreeView = styled(TreeView)`
  overflow: auto;
  word-break: keep-all;
`;

const GenreTreeList: React.FC<GenreTreeListProps> = ({
  genres,
  onGenreSelect,
  className,
}) => {
  // 同じ親を持つgenreを作成順に並び替える.
  // そのうち並び順を指定できるようにするかも.
  const genresCompareFunction = useCallback(() => {
    return (genreA: Genre, genreB: Genre) => {
      if (genreA.creationDate.getTime() > genreB.creationDate.getTime()) {
        return 1;
      }
      if (genreA.creationDate.getTime() < genreB.creationDate.getTime()) {
        return -1;
      }

      return 0;
    };
  }, []);

  const buildGenreTreeNode = useCallback(
    (rawGenre: Genre): GenreTreeNode => {
      // rawGenreの子ジャンルを抽出
      const childrenGenres = genres.filter(
        genre => genre.parentGenreId === rawGenre.id,
      );

      // childrenGenresそれぞれのGenreTreeNodeを作成
      const childrenGenreTreeNodes = childrenGenres
        .sort(genresCompareFunction())
        .map(genre => buildGenreTreeNode(genre));

      return {
        ...rawGenre,
        childrenGenres: [...childrenGenreTreeNodes],
      };
    },
    [genres, genresCompareFunction],
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
    const treeObject = rootGenres
      .sort(genresCompareFunction())
      .map(genre => buildGenreTreeNode(genre));

    // GenreTreeNodeをReactNodeに変換する
    return treeObject.map(obj => buildGenreTreeItems(obj));
  }, [genres, genresCompareFunction, buildGenreTreeNode, buildGenreTreeItems]);

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
