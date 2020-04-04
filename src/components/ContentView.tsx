import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

interface ContentViewProps {
  content: ReactNode;
  footerMenu: ReactNode;
  footerColor: string;
}

const ViewRoot = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Content = styled.div`
  height: 85%;
`;

const FooterMenu = styled(Toolbar)<{
  footerColor: ContentViewProps['footerColor'];
}>`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.footerColor};
`;

const ContentView: React.FC<ContentViewProps> = ({
  content,
  footerMenu,
  footerColor,
}) => {
  return (
    <ViewRoot>
      <Toolbar />
      <Divider />

      <Content>{content}</Content>

      <FooterMenu footerColor={footerColor}>{footerMenu}</FooterMenu>
    </ViewRoot>
  );
};

export default ContentView;
