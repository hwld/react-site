import React, { useState } from 'react';
import { SvgIconProps } from '@material-ui/core';
import SortNoteIcon from '@material-ui/icons/Sort';
import { NotesSortOrder } from '../../../../services/notes';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { SortNotesDialog } from './SortNotesDialog';

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
  const { isOpen, open, close } = useOpener(false);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const handleClick = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setSortOrder(defaultSortOrder);
    open();
  };

  const handleSortNotes = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    sort(sortOrder);
    close();
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    close();
  };

  const handleChangeSortTargetField = (
    targetField: NotesSortOrder['targetField'],
  ) => {
    setSortOrder(state => ({ ...state, targetField }));
  };

  const handleChangeSortOrder = (order: NotesSortOrder['order']) => {
    setSortOrder(state => ({ ...state, order }));
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        aria-label="メモ並び替えダイアログを表示"
        tooltipText="メモの並び替え"
        onClick={handleClick}
      >
        <SortNoteIcon fontSize={size} />
      </ActivatorButton>
      <SortNotesDialog
        isOpen={isOpen}
        onClose={close}
        sortOrder={sortOrder}
        onChangeSortTargetField={handleChangeSortTargetField}
        onChangeSortOrder={handleChangeSortOrder}
        onSortNotes={handleSortNotes}
        onCancel={handleCancel}
      />
    </>
  );
};

export const OpenSortNotesDialogButton = Component;
