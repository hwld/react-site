import React from 'react';
import { Note } from '../../../../services/notes';
import { render } from '../../../../test-util';

import { NoteList } from './NoteList';

describe('<NoteList>', () => {
  const notes: Note[] = [
    {
      id: 'note1',
      categoryId: 'dammy',
      title: 'test-title1',
      text: 'test-text1',
      createdAt: new Date(2000, 6, 1),
      updatedAt: new Date(2000, 7, 1),
    },
    {
      id: 'note2',
      categoryId: 'dammy',
      title: 'test-title2',
      text: 'test-text2',
      createdAt: new Date(2000, 7, 1),
      updatedAt: new Date(2000, 6, 1),
    },
  ];
  test('渡したメモがすべて表示される', () => {
    const { queryByText } = render(<NoteList notes={notes} />);

    expect(queryByText('test-title1')).toBeTruthy();
    expect(queryByText('test-text1')).toBeTruthy();

    expect(queryByText('test-title2')).toBeTruthy();
    expect(queryByText('test-text2')).toBeTruthy();
  });

  test('タイトルの昇降順で並び替えができる', () => {
    const { getAllByLabelText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'title', order: 'asc' }}
      />,
    );

    expect(getAllByLabelText('title')[0].textContent).toBe('test-title1');
    expect(getAllByLabelText('title')[1].textContent).toBe('test-title2');

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'title', order: 'desc' }}
      />,
    );

    expect(getAllByLabelText('title')[0].textContent).toBe('test-title2');
    expect(getAllByLabelText('title')[1].textContent).toBe('test-title1');
  });
  test('テキストの昇降順で並び替えができる', () => {
    const { getAllByLabelText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'text', order: 'asc' }}
      />,
    );

    expect(getAllByLabelText('text')[0].textContent).toBe('test-text1');
    expect(getAllByLabelText('text')[1].textContent).toBe('test-text2');

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'text', order: 'desc' }}
      />,
    );

    expect(getAllByLabelText('text')[0].textContent).toBe('test-text2');
    expect(getAllByLabelText('text')[1].textContent).toBe('test-text1');
  });
  test('作成日の昇降順で並び替えができる', () => {
    const { getAllByLabelText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'createdAt', order: 'asc' }}
      />,
    );
    expect(getAllByLabelText('title')[0].textContent).toMatch(/test-title1/);
    expect(getAllByLabelText('title')[1].textContent).toMatch(/test-title2/);

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'createdAt', order: 'desc' }}
      />,
    );

    expect(getAllByLabelText('title')[0].textContent).toMatch(/test-title2/);
    expect(getAllByLabelText('title')[1].textContent).toMatch(/test-title1/);
  });
  test('更新日の昇降順で並び替えができる', () => {
    const { getAllByLabelText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'updatedAt', order: 'asc' }}
      />,
    );
    expect(getAllByLabelText('title')[0].textContent).toMatch(/test-title2/);
    expect(getAllByLabelText('title')[1].textContent).toMatch(/test-title1/);

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'updatedAt', order: 'desc' }}
      />,
    );

    expect(getAllByLabelText('title')[0].textContent).toMatch(/test-title1/);
    expect(getAllByLabelText('title')[1].textContent).toMatch(/test-title2/);
  });
});
