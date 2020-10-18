import React, { forwardRef, PropsWithChildren } from 'react';
import {
  Tooltip,
  Typography,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@material-ui/core';

export type IconButtonProps = {
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
        <MuiIconButton ref={ref} {...props}>
          {children}
        </MuiIconButton>
      </Tooltip>
    );
  }

  return (
    <MuiIconButton ref={ref} disabled={disabled} {...props}>
      {children}
    </MuiIconButton>
  );
});

export { IconButton };
