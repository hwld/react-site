import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4d4d4d',
      dark: '#353535',
      light: '#707070',
    },
    secondary: {
      main: '#ff9100',
      dark: '#b26500',
      light: '#ffa733',
    },
    text: {
      primary: '#ffffff',
      secondary: '#303030',
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
    MuiAppBar: {
      color: 'secondary',
    },
    MuiToolbar: {
      color: 'secondary',
    },
  },
});

export default theme;
