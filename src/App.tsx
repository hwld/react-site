import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { ContextProvider } from './context/ContextProvider';

const App: React.FC = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ContextProvider>
  );
};

export { App };
