import React from 'react';
import GenresViewMenu from './GenresViewMenu';
import { render, fireEvent, within } from '../../../../test-util';
import {
  genresContextDefaultValue,
  GenresContextProvider,
} from '../../../../context/GenresContext';

describe('<GenresViewMenu>', () => {
  test('親子関係にあるジャンルを削除すると、子以下の削除がスキップされる', () => {
    const removeGenre = jest.fn();

    const { getByTestId } = render(
      <GenresContextProvider
        value={{
          ...genresContextDefaultValue,
          removeGenre,
        }}
      >
        <GenresViewMenu
          genres={[
            {
              genreName: 'parent',
              id: 'parent',
              parentGenreId: '',
              childrenGenreIds: ['child'],
              createdAt: new Date(),
            },
            {
              genreName: 'child',
              id: 'child',
              parentGenreId: 'parent',
              childrenGenreIds: ['grandChild'],
              createdAt: new Date(),
            },
            {
              genreName: 'grandChild',
              id: 'grandChild',
              parentGenreId: 'child',
              childrenGenreIds: [''],
              createdAt: new Date(),
            },
          ]}
          selectedGenreIds={['parent', 'child', 'grandChild']}
        />
      </GenresContextProvider>,
    );

    fireEvent.click(
      within(getByTestId('removeGenreDialog')).getByTestId('activatorButton'),
    );
    fireEvent.click(getByTestId('doneButton'));

    expect(removeGenre.mock.calls.length).toBe(1);
    expect(removeGenre.mock.calls[0][0]).toBe('parent');
  });
});
