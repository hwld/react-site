import React from 'react';
import { useDrop } from 'react-dnd';
import { TreeItem, TreeItemProps } from '../../../ui/TreeView/TreeItem';
import { ListItemDropType } from '../../../ui/List/ListItem';
import { ItemTypes } from '../../../ui/ItemTypes';

type Props = {
  nodeId: string;
  categoryName: string;
  onNotesDrop?: (noteIds: string[], destCategoryId: string) => void;
  tabIndex?: TreeItemProps['tabIndex'];
};

const Component: React.FC<Props> = ({
  children,
  nodeId,
  categoryName,
  onNotesDrop = () => {},
  tabIndex,
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
      tabIndex={tabIndex}
    >
      {children}
    </TreeItem>
  );
};

export const CategoryTreeItem = Component;
