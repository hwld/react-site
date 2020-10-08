import React from 'react';
import { render } from '../../../../test-util';
import { NotesViewMenu } from './NotesViewMenu';

describe('NotesViewMenu', () => {
  test('すべてのメニューアイテムが存在する', () => {
    const { queryByTestId } = render(
      <NotesViewMenu
        sortNotes={() => {}}
        defaultNotesSortOrder={{ targetField: 'title', order: 'asc' }}
        selectedCategoryIds={[]}
        selectedNoteIds={[]}
      />,
    );

    expect(queryByTestId('addNoteDialog')).toBeTruthy();
    expect(queryByTestId('removeNoteDialog')).toBeTruthy();
    expect(queryByTestId('moveNotesDialog')).toBeTruthy();
    expect(queryByTestId('sortNotesDialog')).toBeTruthy();
  });
});
