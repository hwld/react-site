import React from 'react';
import { useDrop } from 'react-dnd';
import { TreeItem } from '../../../ui/TreeView/TreeItem';
import { ListItemDropType } from '../../../ui/List/ListItem';
import { ItemTypes } from '../../../ui/ItemTypes';

type Props = {
  nodeId: string;
  categoryName: string;
  onNotesDrop?: (noteIds: string[], destCategoryId: string) => void;
};

const Component: React.FC<Props> = ({
  children,
  nodeId,
  categoryName,
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
    <TreeItem
      nodeId={nodeId}
      label={categoryName}
      dropRef={drop}
      isDropOver={isDropOver}
      canDrop={canDrop}
    >
      {children}
    </TreeItem>
  );
};

export const CategoryTreeItem = Component;
