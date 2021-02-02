import { Button, ButtonProps, Typography } from '@material-ui/core';
import React from 'react';

type Props = { text?: string } & ButtonProps;

const Component: React.FC<Props> = ({ text = '中止', ...props }) => {
  return (
    <Button variant="outlined" {...props}>
      <Typography>{text}</Typography>
    </Button>
  );
};

export const CancelButton = Component;
