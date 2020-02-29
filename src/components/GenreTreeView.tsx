import React, { useCallback } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeView, TreeItem } from '@material-ui/lab';

export interface Genre {
  genreName: string;
  id: string;
  parentGenreId: string | null;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
}

type GenreTreeNode = Genre & { childrenGenres: GenreTreeNode[] };

interface GenreTreeViewProps {
  genres: Genre[];
}

const GenreTreeView: React.FC<GenreTreeViewProps> = ({ genres }) => {
  const buildGenreTreeNode = useCallback(
    (rawGenre: Genre): GenreTreeNode => {
      // rawGenreの子ジャンルを抽出
      const childrenGenres = genres.filter(
        genre => genre.parentGenreId === rawGenre.id,
      );

      if (childrenGenres.length === 0) {
        return { ...rawGenre, childrenGenres: [] };
      }

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
    const rootGenres = genres.filter(genre => genre.parentGenreId == null);

    // ルートジャンルそれぞれのGenreTreeNodeを作成する
    const treeObject = rootGenres.map(genre => buildGenreTreeNode(genre));

    // GenreTreeNodeをReactNodeに変換する
    return treeObject.map(obj => buildGenreTreeItems(obj));
  }, [genres, buildGenreTreeNode, buildGenreTreeItems]);

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon color="secondary" />}
      defaultExpandIcon={<ChevronRightIcon color="secondary" />}
      defaultEndIcon={<></>}
    >
      {renderGenreTree()}
    </TreeView>
  );
};

export default GenreTreeView;
