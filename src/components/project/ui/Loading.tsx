import { Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

type Props = {
  loading: boolean;
  className?: string;
};

const Component: React.FC<Props> = ({ loading, className }) => {
  return (
    <Backdrop className={className} open={loading}>
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
