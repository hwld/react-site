import React from 'react';
import { render, fireEvent } from '../../../test-util';
import { AddGenreDialog } from './AddCategoryDialog';
import { GenresContextProvider } from '../../../context/CategoriesContext';
import { GenreField, getDefaultGenreService } from '../../../services/categories';

describe('<AddGenreDialog>', () => {
  test('カテゴリー追加処理が適切に呼び出される', () => {
    const addGenre = jest.fn((parentId: string, genreField: GenreField) => ({
      parentId,
      genreField,
    }));
    const { getByTestId, getByLabelText } = render(
      <GenresContextProvider
        value={{
          ...getDefaultGenreService(),
          addGenre,
        }}
      >
        <AddGenreDialog parentGenreId="genre1" />
      </GenresContextProvider>,
    );

    // ダイアログ表示
    fireEvent.click(getByTestId('activatorButton'));

    // カテゴリーの情報を設定
    fireEvent.change(getByLabelText('カテゴリー名'), {
      target: { value: 'TestGenreName' },
    });

    // 追加ボタンを押す
    fireEvent.click(getByTestId('doneButton'));

    // カテゴリーの追加が呼び出されているか
    expect(addGenre.mock.calls.length).toBe(1);
    expect(addGenre.mock.calls[0][1].genreName).toBe('TestGenreName');
  });
});
