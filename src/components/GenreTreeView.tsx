import React, { useCallback, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeView, TreeItem } from '@material-ui/lab';
import styled from 'styled-components';

export interface Genre {
  genreName: string;
  id: string;
  parentGenreId: string | null;
  // 直接の子ジャンルのみをもたせる
  childrenGenreIds: string[];
}

export type GenreTreeNode = Genre & { childrenGenres: GenreTreeNode[] };

interface GenreTreeViewProps {
  genres: Genre[];
  onGenreSelect: (event: React.ChangeEvent<{}>, selectedId: string) => void;
}

const StyledTreeView = styled(TreeView)`
  height: 100%;

  & .MuiTreeItem-content {
    :hover {
      background-color: ${props => props.theme.palette.action.hover};
    }
  }

  & .Mui-selected {
    > .MuiTreeItem-content {
      background-color: ${props => props.theme.palette.action.selected};
    }
  }
`;

const GenreTreeView: React.FC<GenreTreeViewProps> = ({
  genres,
  onGenreSelect,
}) => {
  const [selectedId, setSelectedId] = useState<string>('');

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
          // selected={selectedId === genreTreeNode.id}
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
    <StyledTreeView
      defaultCollapseIcon={<ExpandMoreIcon color="secondary" />}
      defaultExpandIcon={<ChevronRightIcon color="secondary" />}
      defaultEndIcon={<></>}
      onNodeSelect={(event: React.ChangeEvent<{}>, genreId: string) => {
        setSelectedId(genreId);
        onGenreSelect(event, genreId);
      }}
      selected={selectedId}
    >
      {renderGenreTree()}
    </StyledTreeView>
  );
};

export default GenreTreeView;