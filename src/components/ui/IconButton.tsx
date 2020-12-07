import React, { forwardRef, PropsWithChildren, MouseEvent } from 'react';
import {
  Tooltip,
  Typography,
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
} from '@material-ui/core';

export type Props = {
  tooltipText?: string;
  disabled?: boolean;
  'data-testid'?: string;
  tabIndex?: number;
} & MuiIconButtonProps;

const Component = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  function IconButton(
    { tooltipText, disabled, children, onClick, ...props },
    ref,
  ) {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }
    };

    if (tooltipText && !disabled) {
      return (
        <Tooltip title={<Typography>{tooltipText}</Typography>}>
          <MuiIconButton ref={ref} onClick={handleClick} {...props}>
            {children}
          </MuiIconButton>
        </Tooltip>
      );
    }

    return (
      <MuiIconButton
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </MuiIconButton>
    );
  },
);

export const IconButton = Component;
