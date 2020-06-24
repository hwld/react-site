import React from 'react';
import { SwipeableDrawer as MuiDrawer, DrawerProps } from '@material-ui/core';
import styled from 'styled-components';

const PresistentDrawer = styled.div<{ open?: boolean; width?: string }>`
  height: 100%;
  flex-basis: ${({ width }) => `${width}vw`};
  margin-left: ${props => (props.open ? '0px' : `-${props.width}vw`)};
  transition-duration: 0.3s;
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const NormalDrawer = styled(MuiDrawer)<{ width?: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .MuiDrawer-paper {
    width: ${({ width }) => `${width}vw`};
  }
`;

const Drawer: React.FC<DrawerProps & {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  width?: string;
  isPresistent: boolean;
}> = ({ children, open, width, isPresistent, ...rest }) => {
  return isPresistent ? (
    <PresistentDrawer open={open} width={width}>
      {children}
    </PresistentDrawer>
  ) : (
    <NormalDrawer open={open} width={width} {...rest}>
      {children}
    </NormalDrawer>
  );
};

export default Drawer;
