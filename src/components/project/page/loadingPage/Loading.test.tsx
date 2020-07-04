import React from 'react';
import { render } from '../../../../test-util';
import Loading from './Loading';

describe('<Loading>', () => {
  test('Loading画面がが表示される', () => {
    const { queryByTestId } = render(<Loading />);

    expect(queryByTestId('loadingCircle')).toBeTruthy();
    expect(queryByTestId('loadingText')).toBeTruthy();
  });
});
