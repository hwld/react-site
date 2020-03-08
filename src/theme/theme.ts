import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4d4d4d',
      dark: '#353535',
      light: '#707070',
    },
    secondary: {
      main: '#43a047',
      dark: '#2e7031',
      light: '#68b36b',
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
