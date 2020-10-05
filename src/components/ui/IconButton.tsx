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
  icon: React.ReactNode;
  'data-testid'?: string;
  tabIndex?: number;
} & MuiIconButtonProps;

const IconButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IconButtonProps>
>(function IconButton(
  {
    className,
    tooltipText,
    disabled,
    onClick,
    icon,
    'data-testid': dataTestId,
    tabIndex,
    ...props
  },
  ref,
) {
  if (tooltipText && !disabled) {
    return (
      <Tooltip title={<Typography>{tooltipText}</Typography>}>
        <StyledMuiIconButton
          className={className}
          ref={ref}
          onClick={onClick}
          tabIndex={tabIndex}
          data-testid={dataTestId}
          {...props}
        >
          {icon}
        </StyledMuiIconButton>
      </Tooltip>
    );
  }

  return (
    <StyledMuiIconButton
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      tabIndex={tabIndex}
      data-testid={dataTestId}
      {...props}
    >
      {icon}
    </StyledMuiIconButton>
  );
});

export { IconButton };
