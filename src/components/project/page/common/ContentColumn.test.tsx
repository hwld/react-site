import React from 'react';
import { render } from '../../../../test-util';
import { ContentColumn } from './ContentColumn';

describe('<ContentColumn>', () => {
  test('Content,Footerが表示される', () => {
    const { queryByText } = render(
      <ContentColumn footerMenu={<div>testFooter</div>}>
        <div>testContent</div>
      </ContentColumn>,
    );
    expect(queryByText('testContent')).toBeTruthy();
    expect(queryByText('testFooter')).toBeTruthy();
  });
});
