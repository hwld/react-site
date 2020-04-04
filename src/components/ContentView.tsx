import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Toolbar, Divider } from '@material-ui/core';

interface ContentViewProps {
  content: ReactNode;
  footerMenu: ReactNode;
  pageType: 'main' | 'search';
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

const FooterMenu = styled(Toolbar)<{ pageType: ContentViewProps['pageType'] }>`
  display: flex;
  justify-content: center;
  flex: 1;
  background-color: ${props => {
    if (props.pageType === 'main') return props.theme.palette.secondary.main;
    if (props.pageType === 'search') return props.theme.palette.secondary.light;

    return props.theme.palette.secondary.main;
  }};
`;

const ContentView: React.FC<ContentViewProps> = ({
  content,
  footerMenu,
  pageType,
}) => {
  return (
    <ViewRoot>
      <Toolbar />
      <Divider />

      <Content>{content}</Content>

      <FooterMenu pageType={pageType}>{footerMenu}</FooterMenu>
    </ViewRoot>
  );
};

export default ContentView;
