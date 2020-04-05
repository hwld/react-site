import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

interface LoadingProps {
  hoge?: string;
}

const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary.dark};
`;

const Loading: React.FC<LoadingProps> = () => {
  return (
    <Background>
      <CircularProgress color="secondary" />
    </Background>
  );
};

export default Loading;
