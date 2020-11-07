import styled from 'styled-components';

export type PresistentDrawerProps = {
  className?: string;
  width?: string;
  isPresistent: boolean;
};

export const PresistentDrawer = styled.div<{ open?: boolean; width?: string }>`
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
