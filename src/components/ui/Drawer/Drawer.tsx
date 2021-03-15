import React from 'react';
import { PresistentDrawer } from './PresistentDrawer';
import { SwipeableDrawer, SwipeableDrawerProps } from './SwipeableDrawer';

const Component: React.FC<SwipeableDrawerProps & {
  className?: string;
  isPresistent: boolean;
}> = ({ children, open, isPresistent, className, ...rest }) => {
  return isPresistent ? (
    <PresistentDrawer
      open={open}
      aria-label="presistentDrawer"
      className={className}
    >
      {children}
    </PresistentDrawer>
  ) : (
    <SwipeableDrawer
      open={open}
      {...rest}
      aria-label="normalDrawer"
      className={className}
    >
      {children}
    </SwipeableDrawer>
  );
};

export const Drawer = Component;
