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

  const [, drop] = useDrop({
    accept: ItemTypes.ListItem,
    drop(item: ListItemDropType, monitor) {
      if (!monitor.didDrop()) {
        item.ids.forEach(id => {
          moveNote(id, nodeId);
        });
      }
    },
  });

  return (
    <div ref={drop}>
      <TreeItem nodeId={nodeId} label={genreName}>
        {children}
      </TreeItem>
    </div>
  );
};

export default GenreTreeItem;
