import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

interface ContentColumnProps {
  className?: string;
  content: ReactNode;
  footerMenu: ReactNode;
  footerColor: string;
  fullWidth?: boolean;
}

const ViewRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Toolbar)`
  min-height: 64px;
`;

const Content = styled.div`
  height: 83%;
  overflow: auto;
`;

const FooterMenu = styled(Toolbar)`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.color};
  min-height: 75px;

  &.fullWidth {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
`;

const ContentColumn: React.FC<ContentColumnProps> = ({
  className,
  content,
  footerMenu,
  footerColor,
  fullWidth = false,
}) => {
  return (
    <ViewRoot className={className}>
      <Header />
      <Divider />

      <Content>{content}</Content>

      <FooterMenu className={fullWidth ? 'fullWidth' : ''} color={footerColor}>
        {footerMenu}
      </FooterMenu>
    </ViewRoot>
  );
};

export default ContentColumn;
