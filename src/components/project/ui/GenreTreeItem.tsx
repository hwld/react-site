import React from 'react';
import { useDrop } from 'react-dnd';
import { TreeItem } from '../../ui/TreeView/TreeItem';
import { ListItemDropType } from '../../ui/List/ListItem';
import { ItemTypes } from '../../ui/ItemTypes';

type GenreTreeItemProps = {
  nodeId: string;
  genreName: string;
  onNotesDrop?: (noteIds: string[], destGenreId: string) => void;
};

const GenreTreeItem: React.FC<GenreTreeItemProps> = ({
  children,
  nodeId,
  genreName,
  onNotesDrop = () => {},
}) => {
  const [{ isDropOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ListItem,
    drop(item: ListItemDropType, monitor) {
      if (!monitor.didDrop()) {
        onNotesDrop(item.ids, nodeId);
      }
    },
    canDrop: (item, monitor) => {
      return monitor.isOver({ shallow: true });
    },
    collect: monitor => ({
      isDropOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} data-testid={`gti-dropLayer-${nodeId}`}>
      <TreeItem
        nodeId={nodeId}
        label={genreName}
        isDropOver={isDropOver}
        canDrop={canDrop}
      >
        {children}
      </TreeItem>
    </div>
  );
};

export { GenreTreeItem };
