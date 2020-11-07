import {
  Drawer,
  SwipeableDrawerProps as MuiDrawerProps,
} from '@material-ui/core';
import styled from 'styled-components';

export type SwipeableDrawerProps = MuiDrawerProps;
export const SwipeableDrawer = styled(Drawer)<{ width?: string }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .MuiDrawer-paper {
    width: ${({ width }) => `${width}vw`};
  }
`;
