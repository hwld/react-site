import React from 'react';
import { Tooltip, Typography, IconButton } from '@material-ui/core';

type TooltipIconButtonProps = {
  tooltipText: string;
  onClick: () => void;
  icon: React.ReactNode;
};
const TooltipIconButton: React.FC<TooltipIconButtonProps> = ({
  tooltipText,
  onClick,
  icon,
}) => {
  return (
    <Tooltip title={<Typography>{tooltipText}</Typography>}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
};

export { TooltipIconButton };
