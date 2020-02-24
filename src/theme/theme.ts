import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#303030',
    },
    secondary: {
      main: '#424242',
    },
    text: {
      primary: '#ffffff',
    },
  },
  props: {
    MuiTypography: {
      color: 'textPrimary',
    },
  },
});

export default theme;
