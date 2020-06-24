import React, { useContext } from 'react';
import { useDrop } from 'react-dnd';
import TreeItem from '../../ui/TreeView/TreeItem';
import { ListItemDropType } from '../../ui/List/ListItem';
import NotesContext from '../../../context/NotesContext';
import { ItemTypes } from '../../ui/ItemTypes';

type GenreTreeItemProps = {
  nodeId: string;
  genreName: string;
};

const GenreTreeItem: React.FC<GenreTreeItemProps> = ({
  children,
  nodeId,
  genreName,
}) => {
  const { moveNote } = useContext(NotesContext);

  const [{ isDropOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ListItem,
    drop(item: ListItemDropType, monitor) {
      if (!monitor.didDrop()) {
        item.ids.forEach(id => {
          moveNote(id, nodeId);
        });
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
    <div ref={drop}>
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

export default GenreTreeItem;
