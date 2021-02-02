import {
  SwipeableDrawer as MuiDrawer,
  SwipeableDrawerProps as MuiDrawerProps,
} from '@material-ui/core';
import styled from 'styled-components';

export type SwipeableDrawerProps = MuiDrawerProps & { width?: string };
export const SwipeableDrawer = styled(MuiDrawer)<SwipeableDrawerProps>`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .MuiDrawer-paper {
    width: ${({ width }) => `${width}vw`};
  }
`;
