import styled from 'styled-components';
import { IconButton } from '../../ui/IconButton';

const StyledComponent = styled(IconButton)`
  background-color: ${props => props.theme.palette.secondary.main};

  &:hover {
    background-color: #ffffffa0;
  }
`;

export const ActivatorButton = StyledComponent;
