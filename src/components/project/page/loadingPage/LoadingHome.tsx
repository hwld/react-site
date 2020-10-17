import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@material-ui/core';

type Props = {
  className?: string;
};

const Component: React.FC<Props> = ({ className }) => {
  return (
    <div className={className} data-testid="loadingPage">
      <CircularProgress
        size="5rem"
        color="secondary"
        data-testid="loadingCircle"
      />
      <Typography className="loadingText" data-testid="loadingText">
        Now Loading
      </Typography>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};

  & > .loadingText {
    font-size: 2.5rem;
  }
`;

export const LoadingHome = StyledComponent;
