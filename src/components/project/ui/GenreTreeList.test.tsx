import React from 'react';
import { render } from '../../../test-util';
import GenreTreeList from './GenreTreeList';
import { Genre } from '../../../repositories/genres';

describe('<GenreTreeList>', () => {
  const genres: Genre[] = [
    {
      genreName: 'parent1',
      createdAt: new Date(),
      id: 'parent1',
      parentGenreId: '',
      childrenGenreIds: ['child1-1'],
    },
    {
      genreName: 'child1-1',
      createdAt: new Date(),
      id: 'child1-1',
      parentGenreId: 'parent1',
      childrenGenreIds: [''],
    },
    {
      genreName: 'parent2',
      createdAt: new Date(),
      id: 'parent2',
      parentGenreId: '',
      childrenGenreIds: [''],
    },
  ];
  test('渡したすべてのジャンルが表示される', () => {
    const { getByText } = render(<GenreTreeList genres={genres} />);
    expect(getByText('parent1')).toBeTruthy();
    expect(getByText('child1-1')).toBeTruthy();
    expect(getByText('parent2')).toBeTruthy();
  });
});
