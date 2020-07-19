import React, { useState, useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import NotesContext from '../../../../context/NotesContext';
import NoteList from '../../ui/NoteList';
import { NotesSortOrder } from '../../ui/NotesSortConditionFields';
import ContentColumn from '../../ui/ContentColumn';
import NotesViewMenu from './NotesViewMenu';
import MobileContext from '../../../../context/MobileContext';

interface NotesViewProps {
  selectedGenreIds: string[];
  className?: string;
}

const NotesView: React.FC<NotesViewProps> = ({
  selectedGenreIds,
  className,
}) => {
  const { isMobile } = useContext(MobileContext);
  const { notes } = useContext(NotesContext);
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
          isDrag
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

export default NotesView;
