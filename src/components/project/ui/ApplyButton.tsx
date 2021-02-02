import { Button, ButtonProps, Typography } from '@material-ui/core';
import React from 'react';

type Props = { text?: string } & ButtonProps;

const Component: React.FC<Props> = ({ text = '実行', ...props }) => {
  return (
    <Button {...props}>
      <Typography color="textSecondary">{text}</Typography>
    </Button>
  );
};

export const ApplyButton = Component;
