import React, { useCallback, useMemo, forwardRef } from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import { TreeView } from '../../ui/TreeView/TreeView';
import { GenreTreeItem } from './GenreTreeItem';
import { Genre } from '../../../services/genres';

export type GenreTreeNode = Genre & { childrenGenres: GenreTreeNode[] };

const StyledTreeView = styled(TreeView)`
  height: 100%;
  overflow: auto;
  word-break: keep-all;
`;

const StyledAlert = styled(Alert)`
  margin: 20px auto;
  width: 80%;
`;

type GenreTreeListProps = {
  genres: Genre[];
  className?: string;
  multiple?: boolean;
  selectedGenreIds?: string[];
  expanded?: string[];
  onExpand?: (expandedIds: string[]) => void;
  onGenreSelect?: (selectedId: string[]) => void;
  draggable?: boolean;
  onGenreDrop?: (sourceId: string[], targetId: string) => void;
  onNotesDrop?: (noteIds: string[], destGenreId: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLUListElement>) => void;
};

export const GenreTreeList = forwardRef<
  HTMLUListElement,
  React.PropsWithChildren<GenreTreeListProps>
>(function GenreTreeList(
  {
    multiple,
    genres,
    selectedGenreIds = [],
    expanded,
    onExpand = () => {},
    onGenreSelect = () => {},
    draggable = false,
    onGenreDrop,
    onNotesDrop,
    onKeyDown,
    className,
  },
  ref,
) {
  // 同じ親を持つgenreを作成順に並び替える.
  // そのうち並び順を指定できるようにするかも.
  const genresCompareFunction = useCallback(() => {
    return (genreA: Genre, genreB: Genre) => {
      if (genreA.createdAt.getTime() > genreB.createdAt.getTime()) {
        return 1;
      }
      if (genreA.createdAt.getTime() < genreB.createdAt.getTime()) {
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
        <GenreTreeItem
          nodeId={genreTreeNode.id}
          genreName={genreTreeNode.genreName}
          key={genreTreeNode.id}
          onNotesDrop={onNotesDrop}
        >
          {genreTreeNode.childrenGenres.length === 0
            ? null
            : genreTreeNode.childrenGenres.map(node =>
                buildGenreTreeItems(node),
              )}
        </GenreTreeItem>
      );
    },
    [onNotesDrop],
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
      multiSelect={multiple}
      className={className}
      selected={selectedGenreIds}
      expanded={expanded}
      onExpand={onExpand}
      onNodeSelect={onGenreSelect}
      draggable={draggable}
      onDrop={onGenreDrop}
      onKeyDown={onKeyDown}
      ref={ref}
    >
      {genres.length !== 0 ? (
        genreTreeItems
      ) : (
        <StyledAlert severity="warning">ジャンルが存在しません</StyledAlert>
      )}
    </StyledTreeView>
  );
});
