import React, { forwardRef, PropsWithChildren } from 'react';
import {
  Tooltip,
  Typography,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@material-ui/core';
import styled from 'styled-components';

const StyledMuiIconButton = styled(MuiIconButton)`
  background-color: ${props => props.theme.palette.secondary.main};

  &:hover {
    background-color: ${props => props.theme.palette.secondary.dark};
  }
`;

type IconButtonProps = {
  tooltipText?: string;
  disabled?: boolean;
  'data-testid'?: string;
  tabIndex?: number;
} & MuiIconButtonProps;

const IconButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IconButtonProps>
>(function IconButton({ tooltipText, disabled, children, ...props }, ref) {
  if (tooltipText && !disabled) {
    return (
      <Tooltip title={<Typography>{tooltipText}</Typography>}>
        <StyledMuiIconButton ref={ref} {...props}>
          {children}
        </StyledMuiIconButton>
      </Tooltip>
    );
  }

  return (
    <StyledMuiIconButton ref={ref} disabled={disabled} {...props}>
      {children}
    </StyledMuiIconButton>
  );
});

export { IconButton };
