import React from 'react';
import {
  SwipeableDrawer as MuiDrawer,
  SwipeableDrawerProps,
} from '@material-ui/core';
import styled from 'styled-components';

const PresistentDrawer = styled.div<{ open?: boolean; width?: string }>`
  height: 100%;
  flex-basis: ${({ width }) => `${width}vw`};
  margin-left: ${props => (props.open ? '0px' : `-${props.width}vw`)};
  transition-property: margin-left;
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

const Component: React.FC<SwipeableDrawerProps & {
  className?: string;
  width?: string;
  isPresistent: boolean;
}> = ({ children, open, width, isPresistent, className, ...rest }) => {
  return isPresistent ? (
    <PresistentDrawer
      open={open}
      width={width}
      data-testid="presistentDrawer"
      className={className}
    >
      {children}
    </PresistentDrawer>
  ) : (
    <NormalDrawer
      open={open}
      width={width}
      {...rest}
      data-testid="normalDrawer"
      className={className}
    >
      {children}
    </NormalDrawer>
  );
};

export const Drawer = Component;
