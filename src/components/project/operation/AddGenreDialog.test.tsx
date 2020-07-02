import React from 'react';
import { render, fireEvent } from '../../../test-util';
import AddGenreDialog from './AddGenreDialog';
import GenresContext from '../../../context/GenresContext';
import { Genre } from '../../../services/genres';

describe('<AddGenreDialog>', () => {
  test('ジャンル追加処理が適切に呼び出される', () => {
    const addGenre = jest.fn((genre: Genre) => genre);
    const others = jest.fn();
    const { getByRole, getAllByRole } = render(
      <GenresContext.Provider
        value={{
          genres: [],
          addGenre,
          removeGenre: others,
          updateGenre: others,
          moveGenre: others,
        }}
      >
        <AddGenreDialog parentGenreId="genre1" />
      </GenresContext.Provider>,
    );

    // ダイアログ表示
    const activator = getByRole('button');
    expect(activator).toBeTruthy();
    fireEvent.click(activator);

    // ジャンルの情報を設定
    const genreNameField = getByRole('textbox');
    expect(genreNameField).toBeTruthy();
    fireEvent.change(genreNameField, { target: { value: 'TestGenreName' } });

    // 追加ボタンを押す
    const addButton = getAllByRole('button').filter(button =>
      button.textContent?.match(/追加/),
    );
    expect(addButton.length).toBe(1);
    fireEvent.click(addButton[0]);

    // ジャンルの追加が呼び出されているか
    expect(addGenre.mock.calls.length).toBe(1);
    expect(addGenre.mock.calls[0][0].genreName).toBe('TestGenreName');
  });
});
