import React, { useState } from 'react';
import { render, dragAndDrop } from '../../../../test-util';
import { GenresView } from './GenresView';
import { GenresContextProvider } from '../../../../context/GenresContext';

describe('<GenresView>', () => {
  const GenreViewTest: React.FC<{
    moveGenres: (sourceGenreId: string[], destGenreId: string) => {};
  }> = ({ moveGenres }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <GenresContextProvider
        value={{
          addGenre: () => {},
          removeGenres: () => {},
          updateGenre: () => {},
          genres: [
            {
              genreName: 'genre1',
              id: 'genre1',
              childrenGenreIds: [],
              parentGenreId: '',
              createdAt: new Date(),
            },
            {
              genreName: 'genre2',
              id: 'genre2',
              childrenGenreIds: [],
              parentGenreId: '',
              createdAt: new Date(),
            },
          ],
          moveGenres,
        }}
      >
        <GenresView
          selectedGenreIds={selectedIds}
          onGenreSelect={setSelectedIds}
        />
      </GenresContextProvider>
    );
  };
  test('コンテキストに含まれるmoveGenreが正しく呼び出されている', () => {
    const moveGenres = jest.fn(
      (sourceGenreIds: string[], destGenreId: string) => ({
        sourceGenreIds,
        destGenreId,
      }),
    );
    const { getByTestId } = render(<GenreViewTest moveGenres={moveGenres} />);
    dragAndDrop(
      getByTestId('dragLayer-genre2'),
      getByTestId('dropLayer-genre1'),
    );
    expect(moveGenres.mock.calls.length).toBe(1);
  });
});
