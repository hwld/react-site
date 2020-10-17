import { DialogContent } from '@material-ui/core';
import React from 'react';
import { NotesSortOrder } from '../../../../services/notes';
import { NotesSortConditionField } from '../../ui/NotesSortConditionFields';

type Props = {
  className?: string;
  sortOrder: NotesSortOrder;
  onChangeSortTargetField: (targetField: NotesSortOrder['targetField']) => void;
  onChangeSortOrder: (sortOrder: NotesSortOrder['order']) => void;
};

const Component: React.FC<Props> = ({
  className,
  sortOrder,
  onChangeSortTargetField,
  onChangeSortOrder,
}) => {
  return (
    <DialogContent className={className}>
      <NotesSortConditionField
        notesSortOrder={sortOrder}
        onChangeTargetField={onChangeSortTargetField}
        onChangeOrder={onChangeSortOrder}
      />
    </DialogContent>
  );
};

export const SortNotesDialogContent = Component;
