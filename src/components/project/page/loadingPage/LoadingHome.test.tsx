import React from 'react';
import { render } from '../../../../test-util';
import { LoadingHome } from './LoadingHome';

describe('<Loading>', () => {
  test('Loading画面が表示される', () => {
    const { queryByTestId } = render(<LoadingHome />);

    expect(queryByTestId('loadingCircle')).toBeTruthy();
    expect(queryByTestId('loadingText')).toBeTruthy();
  });
});
