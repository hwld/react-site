import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  return (
    <Backdrop className={className} open>
      <CircularProgress
        size="5rem"
        color="secondary"
        data-testid="loadingCircle"
      />
    </Backdrop>
  );
};

const StyledComponent = styled(Component)`
  z-index: 3000;
`;

export const Loading = StyledComponent;
