import React from 'react';
import { SvgIconProps } from '@material-ui/core';
import SortNoteIcon from '@material-ui/icons/Sort';
import { NotesSortOrder } from '../../../../services/notes';
import { ActivatorButton } from '../ActivatorButton';
import { useOpener } from '../../../../util/hooks/useOpener';
import { SortNotesDialog } from './SortNotesDialog';
import { useAppStateContext } from '../../../../context/AppStateContext';

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
  const { isMobile } = useAppStateContext();

  const handleSortNotes = (order: NotesSortOrder) => {
    sort(order);
    close();
  };

  return (
    <>
      <ActivatorButton
        disabled={disabled}
        aria-label="メモ並び替えダイアログを表示"
        tooltipText="メモの並び替え"
        onClick={open}
      >
        <SortNoteIcon fontSize={size} />
      </ActivatorButton>
      <SortNotesDialog
        isOpen={isOpen}
        isMobile={isMobile}
        onClose={close}
        defaultSortOrder={defaultSortOrder}
        onSortNotes={handleSortNotes}
      />
    </>
  );
};

export const OpenSortNotesDialogButton = Component;
