import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

const ViewRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Toolbar)``;

const Content = styled.div`
  height: 88%;
  overflow: auto;
`;

const FooterMenu = styled(Toolbar)`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.theme.palette.secondary.main};

  &.fixed {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
`;

interface ContentColumnProps {
  className?: string;
  footerMenu?: ReactNode;
  fixedFooter?: boolean;
}

const ContentColumn: React.FC<ContentColumnProps> = ({
  children,
  className,
  footerMenu,
  fixedFooter = false,
}) => {
  return (
    <ViewRoot className={className}>
      <Header />
      <Divider />

      <Content>{children}</Content>

      <FooterMenu className={fixedFooter ? 'fixed' : ''} data-testid="footer">
        {footerMenu}
      </FooterMenu>
    </ViewRoot>
  );
};

export default ContentColumn;
