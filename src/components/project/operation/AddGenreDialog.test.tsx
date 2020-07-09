import React from 'react';
import { render, fireEvent } from '../../../test-util';
import AddGenreDialog from './AddGenreDialog';
import GenresContext, {
  genresContextDefaultValue,
} from '../../../context/GenresContext';
import { Genre } from '../../../services/genres';

describe('<AddGenreDialog>', () => {
  test('ジャンル追加処理が適切に呼び出される', () => {
    const addGenre = jest.fn((genre: Genre) => genre);
    const { getByTestId, getByLabelText } = render(
      <GenresContext.Provider
        value={{
          ...genresContextDefaultValue,
          addGenre,
        }}
      >
        <AddGenreDialog parentGenreId="genre1" />
      </GenresContext.Provider>,
    );

    // ダイアログ表示
    fireEvent.click(getByTestId('activatorButton'));

    // ジャンルの情報を設定
    fireEvent.change(getByLabelText('ジャンル名'), {
      target: { value: 'TestGenreName' },
    });

    // 追加ボタンを押す
    fireEvent.click(getByTestId('doneButton'));

    // ジャンルの追加が呼び出されているか
    expect(addGenre.mock.calls.length).toBe(1);
    expect(addGenre.mock.calls[0][0].genreName).toBe('TestGenreName');
  });
});
