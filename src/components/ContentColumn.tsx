import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

interface ContentColumnProps {
  className?: string;
  content: ReactNode;
  footerMenu: ReactNode;
  footerColor: string;
}

const ViewRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  height: 85%;
`;

const FooterMenu = styled(Toolbar)<{
  color: ContentColumnProps['footerColor'];
}>`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.color};
`;

const ContentColumn: React.FC<ContentColumnProps> = ({
  className,
  content,
  footerMenu,
  footerColor,
}) => {
  return (
    <ViewRoot className={className}>
      <Toolbar />
      <Divider />

      <Content>{content}</Content>

      <FooterMenu color={footerColor}>{footerMenu}</FooterMenu>
    </ViewRoot>
  );
};

export default ContentColumn;
