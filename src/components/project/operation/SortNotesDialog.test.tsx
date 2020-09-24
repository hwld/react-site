import React from 'react';
import { NotesSortOrder } from '../../../services/useNoteStoreService';
import { render, fireEvent } from '../../../test-util';
import { SortNotesDialog } from './SortNotesDialog';

describe('<SortNotesDialog>', () => {
  test('タイトルの昇降順を設定できる', () => {
    const sort = jest.fn((order: NotesSortOrder) => order);
    const { getByTestId } = render(<SortNotesDialog sort={sort} />);

    // 昇順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('title'));
    fireEvent.click(getByTestId('asc'));
    fireEvent.click(getByTestId('doneButton'));

    expect(sort.mock.calls.length).toBe(1);
    expect(sort.mock.calls[0][0].targetField).toBe('title');
    expect(sort.mock.calls[0][0].order).toBe('asc');

    // 降順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('title'));
    fireEvent.click(getByTestId('desc'));
    fireEvent.click(getByTestId('doneButton'));
    expect(sort.mock.calls.length).toBe(2);
    expect(sort.mock.calls[1][0].targetField).toBe('title');
    expect(sort.mock.calls[1][0].order).toBe('desc');
  });
  test('本文の昇降順を設定できる', () => {
    const sort = jest.fn((order: NotesSortOrder) => order);
    const { getByTestId } = render(<SortNotesDialog sort={sort} />);

    // 昇順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('text'));
    fireEvent.click(getByTestId('asc'));
    fireEvent.click(getByTestId('doneButton'));

    expect(sort.mock.calls.length).toBe(1);
    expect(sort.mock.calls[0][0].targetField).toBe('text');
    expect(sort.mock.calls[0][0].order).toBe('asc');

    // 降順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('text'));
    fireEvent.click(getByTestId('desc'));
    fireEvent.click(getByTestId('doneButton'));
    expect(sort.mock.calls.length).toBe(2);
    expect(sort.mock.calls[1][0].targetField).toBe('text');
    expect(sort.mock.calls[1][0].order).toBe('desc');
  });
  test('作成日の昇降順を設定できる', () => {
    const sort = jest.fn((order: NotesSortOrder) => order);
    const { getByTestId } = render(<SortNotesDialog sort={sort} />);

    // 昇順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('createdAt'));
    fireEvent.click(getByTestId('asc'));
    fireEvent.click(getByTestId('doneButton'));

    expect(sort.mock.calls.length).toBe(1);
    expect(sort.mock.calls[0][0].targetField).toBe('createdAt');
    expect(sort.mock.calls[0][0].order).toBe('asc');

    // 降順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('createdAt'));
    fireEvent.click(getByTestId('desc'));
    fireEvent.click(getByTestId('doneButton'));
    expect(sort.mock.calls.length).toBe(2);
    expect(sort.mock.calls[1][0].targetField).toBe('createdAt');
    expect(sort.mock.calls[1][0].order).toBe('desc');
  });
  test('更新日の昇降順を設定できる', () => {
    const sort = jest.fn((order: NotesSortOrder) => order);
    const { getByTestId } = render(<SortNotesDialog sort={sort} />);

    // 昇順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('updatedAt'));
    fireEvent.click(getByTestId('asc'));
    fireEvent.click(getByTestId('doneButton'));

    expect(sort.mock.calls.length).toBe(1);
    expect(sort.mock.calls[0][0].targetField).toBe('updatedAt');
    expect(sort.mock.calls[0][0].order).toBe('asc');

    // 降順
    fireEvent.click(getByTestId('activatorButton'));
    fireEvent.click(getByTestId('updatedAt'));
    fireEvent.click(getByTestId('desc'));
    fireEvent.click(getByTestId('doneButton'));
    expect(sort.mock.calls.length).toBe(2);
    expect(sort.mock.calls[1][0].targetField).toBe('updatedAt');
    expect(sort.mock.calls[1][0].order).toBe('desc');
  });
});
