import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

const ViewRoot = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Toolbar)`
  height: 48px;
`;

const Content = styled.div`
  /* 100%からheaderとfooterの高さを引く */
  height: calc(100% - 48px - 48px);
  overflow: auto;
`;

const FooterMenu = styled(Toolbar)`
  height: 48px;
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.theme.palette.secondary.main};

  /* モバイル版では画面の下に張り付かせるためにpositionをfixedにする */
  &.mobile {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
`;

type Props = {
  className?: string;
  footerMenu?: ReactNode;
  isMobile?: boolean;
};

const Component: React.FC<Props> = ({
  children,
  className,
  footerMenu,
  isMobile = false,
}) => {
  return (
    <ViewRoot className={className}>
      <Header data-testid="header" />
      <Divider />

      <Content className={isMobile ? 'mobile' : ''}>{children}</Content>

      <FooterMenu className={isMobile ? 'mobile' : ''} data-testid="footer">
        {footerMenu}
      </FooterMenu>
    </ViewRoot>
  );
};

export const ContentColumn = Component;
