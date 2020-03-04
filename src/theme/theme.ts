import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4d4d4d',
      dark: '#353535',
      light: '#707070',
    },
    secondary: {
      main: '#ff1744',
      dark: '#b2102f',
      light: '#ff4569',
    },
    text: {
      primary: '#ffffff',
    },
    action: {
      selected: '#757575',
      hover: '#424242',
    },
  },
  props: {
    MuiTypography: {
      color: 'textPrimary',
    },
  },
});

export default theme;
