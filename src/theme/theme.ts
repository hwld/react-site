import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4d4d4d',
      dark: '#353535',
      light: '#707070',
    },
    secondary: {
      main: '#00b0ff',
      dark: '#007bb2',
      light: '#33bfff',
    },
    text: {
      primary: '#ffffff',
      secondary: '000000',
    },
    action: {
      selected: '#007bb2',
      hover: '#707070',
    },
  },
  props: {
    MuiTypography: {
      color: 'textPrimary',
    },
  },
});

export default theme;
