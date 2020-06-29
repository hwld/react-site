import React from 'react';
import { render } from '../../../test-util';
import NoteList from './NoteList';
import { Note } from '../../../services/notes';

describe('<NoteList>', () => {
  const notes: Note[] = [
    {
      id: 'note1',
      genreId: 'dammy',
      title: 'test-title1',
      text: 'test-text1',
      authorName: 'test-authorName1',
      bookName: 'test-bookName1',
      creationDate: new Date(),
      lastUpdated: new Date(),
    },
    {
      id: 'note2',
      genreId: 'dammy',
      title: 'test-title2',
      text: 'test-text2',
      authorName: 'test-authorName2',
      bookName: 'test-bookName2',
      creationDate: new Date(),
      lastUpdated: new Date(),
    },
  ];
  test('渡したノートがすべて表示される', () => {
    const { getByText } = render(<NoteList notes={notes} />);

    expect(getByText('test-title1')).toBeTruthy();
    expect(getByText('test-text1')).toBeTruthy();
    expect(getByText(/test-authorName1/)).toBeTruthy();
    expect(getByText(/test-bookName1/)).toBeTruthy();

    expect(getByText('test-title2')).toBeTruthy();
    expect(getByText('test-text2')).toBeTruthy();
    expect(getByText(/test-authorName2/)).toBeTruthy();
    expect(getByText(/test-bookName2/)).toBeTruthy();
  });

  test('タイトルの昇降順で並び替えができる', () => {
    const { getAllByText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'title', order: 'asc' }}
      />,
    );

    expect(getAllByText(/test-title/)[0].textContent).toBe('test-title1');
    expect(getAllByText(/test-title/)[1].textContent).toBe('test-title2');

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'title', order: 'desc' }}
      />,
    );

    expect(getAllByText(/test-title/)[0].textContent).toBe('test-title2');
    expect(getAllByText(/test-title/)[1].textContent).toBe('test-title1');
  });
  test('テキストの昇降順で並び替えができる', () => {
    const { getAllByText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'text', order: 'asc' }}
      />,
    );

    expect(getAllByText(/test-text/)[0].textContent).toBe('test-text1');
    expect(getAllByText(/test-text/)[1].textContent).toBe('test-text2');

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'text', order: 'desc' }}
      />,
    );

    expect(getAllByText(/test-text/)[0].textContent).toBe('test-text2');
    expect(getAllByText(/test-text/)[1].textContent).toBe('test-text1');
  });
  test('著者名の昇降順で並び替えができる', () => {
    const { getAllByText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'authorName', order: 'asc' }}
      />,
    );

    expect(getAllByText(/test-authorName/)[0].textContent).toMatch(
      /test-authorName1/,
    );
    expect(getAllByText(/test-authorName/)[1].textContent).toMatch(
      /test-authorName2/,
    );

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'authorName', order: 'desc' }}
      />,
    );

    expect(getAllByText(/test-authorName/)[0].textContent).toMatch(
      /test-authorName2/,
    );
    expect(getAllByText(/test-authorName/)[1].textContent).toMatch(
      /test-authorName1/,
    );
  });
  test('書籍名の昇降順で並び替えができる', () => {
    const { getAllByText, rerender } = render(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'bookName', order: 'asc' }}
      />,
    );

    expect(getAllByText(/test-bookName/)[0].textContent).toMatch(
      /test-bookName1/,
    );
    expect(getAllByText(/test-bookName/)[1].textContent).toMatch(
      /test-bookName2/,
    );

    rerender(
      <NoteList
        notes={notes}
        notesSortOrder={{ targetField: 'bookName', order: 'desc' }}
      />,
    );

    expect(getAllByText(/test-bookName/)[0].textContent).toMatch(
      /test-bookName2/,
    );
    expect(getAllByText(/test-bookName/)[1].textContent).toMatch(
      /test-bookName1/,
    );
  });
});
