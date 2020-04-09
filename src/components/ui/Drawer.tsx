import React from 'react';
import {
  Drawer as MuiDrawer,
  useTheme,
  useMediaQuery,
  DrawerProps,
} from '@material-ui/core';
import styled from 'styled-components';

const ImmobileDrawer = styled.div<{ open?: boolean; width?: string }>`
  height: 100%;
  flex-basis: ${({ width }) => `${width}vw`};
  margin-left: ${props => (props.open ? '0px' : `-${props.width}vw`)};
  transition-duration: 0.3s;
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MobileDrawer = styled(MuiDrawer)<{
  width?: string;
}>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .MuiDrawer-paper {
    width: ${({ width }) => `${width}vw`};
  }
`;

const Drawer: React.FC<DrawerProps & {
  width?: string;
  mobileWidth?: string;
}> = ({ children, open, width, mobileWidth, ...rest }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return isMobile ? (
    <MobileDrawer open={open} width={mobileWidth} {...rest}>
      {children}
    </MobileDrawer>
  ) : (
    <ImmobileDrawer open={open} width={width}>
      {children}
    </ImmobileDrawer>
  );
};

export default Drawer;
