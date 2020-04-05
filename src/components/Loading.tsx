import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

interface LoadingProps {
  hoge?: string;
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Background>
      <CircularProgress size="10rem" color="secondary" />
    </Background>
  );
};

export default Loading;
