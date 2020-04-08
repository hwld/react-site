import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  StylesProvider,
  ThemeProvider as MaterialThemeProvider,
} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import theme from './theme/theme';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render(
  <StylesProvider injectFirst>
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <App />
      </StyledThemeProvider>
    </MaterialThemeProvider>
  </StylesProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
