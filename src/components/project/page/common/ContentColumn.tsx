import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

type Props = {
  className?: string;
  footerMenu?: ReactNode;
};

const Component: React.FC<Props> = ({ children, className, footerMenu }) => {
  return (
    <div className={className}>
      <Toolbar className="header" aria-label="header" />
      <Divider />

      <div className="content">{children}</div>

      <Toolbar className="footer" aria-label="footer">
        {footerMenu}
      </Toolbar>
    </div>
  );
};

const StyledComponent = styled(Component)<{ isFixedFooter?: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > .header {
    height: 48px;
  }

  & > .content {
    /* 100%からheaderとfooterの高さを引く */
    height: calc(100% - 48px - 48px);
    overflow: auto;
  }

  & > .footer {
    height: 48px;
    display: flex;
    justify-content: center;
    flex: 1;
    background-color: ${props => props.theme.palette.secondary.main};

    ${props =>
      props.isFixedFooter &&
      css`
        position: fixed;
        width: 100%;
        bottom: 0;
      `}
  }
`;

export const ContentColumn = StyledComponent;
