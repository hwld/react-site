import { createMuiTheme } from '@material-ui/core';

const appTheme = createMuiTheme({
  palette: {
    type: 'dark',
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
      selected: 'rgba(255,255,255,0.4)',
      hover: 'rgba(0,0,0,0.26)',
      disabled: 'rgba(0,0,0,0.26)',
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
      variant: 'dense',
    },
    MuiIconButton: {
      color: 'primary',
    },
  },
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
});

export { appTheme };
