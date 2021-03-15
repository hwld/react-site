import styled from 'styled-components';

export type PresistentDrawerProps = {
  className?: string;
  isPresistent: boolean;
};

export const PresistentDrawer = styled.div<{ open?: boolean }>`
  height: 100%;
  width: 40vw;
  margin-left: ${props => (props.open ? '0px' : '-40vw')};
  transition-property: margin-left;
  transition-duration: 0.3s;
  background-color: ${props => props.theme.palette.primary.main};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
