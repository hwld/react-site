import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import SortNoteIcon from '@material-ui/icons/Sort';
import { OperationDialog } from '../OperationDialog';
import { NotesSortOrder } from '../../../../services/notes';
import { SortNotesDialogContent } from './SortNotesDialogContent';
import { OperationIconButton } from '../OperationIconButton';

type Props = {
  sort: (order: NotesSortOrder) => void;
  defaultSortOrder?: NotesSortOrder;
  disabled?: boolean;
  size?: SvgIconProps['fontSize'];
};

const Component: React.FC<Props> = ({
  sort,
  defaultSortOrder = { targetField: 'createdAt', order: 'asc' },
  disabled,
  size,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const sortNotes = () => {
    sort(sortOrder);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSortOrder(defaultSortOrder);
    setIsOpen(true);
  };

  const changeSortTargetField = (
    targetField: NotesSortOrder['targetField'],
  ) => {
    setSortOrder(state => ({ ...state, targetField }));
  };

  const changeSortOrder = (order: NotesSortOrder['order']) => {
    setSortOrder(state => ({ ...state, order }));
  };

  return (
    <OperationDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="ノートの並び替え"
      activator={
        <OperationIconButton
          disabled={disabled}
          tooltipText="ノートの並び替え"
          onClick={handleClick}
          data-testid="activatorButton"
        >
          <SortNoteIcon fontSize={size} />
        </OperationIconButton>
      }
      doneText="並び替え"
      onDone={sortNotes}
      data-testid="sortNotesDialog"
    >
      <SortNotesDialogContent
        sortOrder={sortOrder}
        onChangeSortTargetField={changeSortTargetField}
        onChangeSortOrder={changeSortOrder}
      />
    </OperationDialog>
  );
};

export const SortNotesButton = Component;
