import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import TreeView from '../../ui/TreeView/TreeView';
import TreeItem from '../../ui/TreeView/TreeItem';
import { Genre } from '../../../services/genres';

export type GenreTreeNode = Genre & { childrenGenres: GenreTreeNode[] };

interface GenreTreeListProps {
  multiple?: boolean;
  genres: Genre[];
  selectedGenreIds: string[];
  onGenreSelect: (selectedId: string[]) => void;
  className?: string;
}

const StyledTreeView = styled(TreeView)`
  height: 100%;
  overflow: auto;
  word-break: keep-all;
`;

const GenreTreeList: React.FC<GenreTreeListProps> = ({
  multiple = false,
  genres,
  selectedGenreIds,
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

  const genreTreeItems = useMemo(() => {
    // ルートジャンルを取得する
    const rootGenres = genres.filter(genre => genre.parentGenreId === '');

    // ルートジャンルそれぞれのGenreTreeNodeを作成する
    const treeObject = rootGenres
      .sort(genresCompareFunction())
      .map(genre => buildGenreTreeNode(genre));

    // GenreTreeNodeをReactNodeに変換する
    return treeObject.map(obj => buildGenreTreeItems(obj));
  }, [buildGenreTreeItems, buildGenreTreeNode, genres, genresCompareFunction]);

  return (
    <StyledTreeView
      multiple={multiple}
      className={className}
      defaultSelectedIds={selectedGenreIds}
      onNodeSelect={(id: string[]) => {
        onGenreSelect(id);
      }}
    >
      {genres.length !== 0 ? (
        genreTreeItems
      ) : (
        <Alert severity="warning">ジャンルが存在しません</Alert>
      )}
    </StyledTreeView>
  );
};

export default GenreTreeList;
