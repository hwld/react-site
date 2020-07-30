import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { NoteList } from '../../ui/NoteList';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import { ContentColumn } from '../../ui/ContentColumn';
import { NotesViewMenu } from './NotesViewMenu';
import { useMobileContext } from '../../../../context/MobileContext';
import { useNotesContext } from '../../../../context/NotesContext';

interface NotesViewProps {
  selectedGenreIds: string[];
  className?: string;
}

const NotesView: React.FC<NotesViewProps> = ({
  selectedGenreIds,
  className,
}) => {
  const { isMobile } = useMobileContext();
  const { notes } = useNotesContext();
  const [selectedNoteIds, setSelectedNoteIds] = useState<string[]>([]);
  const [notesSortOrder, setNotesSortOrder] = useState<NotesSortOrder>({
    targetField: 'createdAt',
    order: 'asc',
  });

  const viewNotes = notes.filter(note =>
    selectedGenreIds.includes(note.genreId),
  );

  const notesContent = () => {
    return selectedGenreIds.length !== 0 ? (
      <>
        <NoteList
          draggable
          notes={viewNotes}
          selectedNoteIds={selectedNoteIds}
          onNotesSelect={setSelectedNoteIds}
          notesSortOrder={notesSortOrder}
        />
      </>
    ) : (
      <Alert severity="warning" data-testid="noselectedAlert">
        ジャンルを選択してください
      </Alert>
    );
  };

  return (
    <ContentColumn
      className={className}
      fixedFooter={isMobile}
      footerMenu={
        <NotesViewMenu
          selectedGenreIds={selectedGenreIds}
          selectedNoteIds={selectedNoteIds}
          defaultNotesSortOrder={notesSortOrder}
          sortNotes={setNotesSortOrder}
        />
      }
    >
      {notesContent()}
    </ContentColumn>
  );
};

export { NotesView };
