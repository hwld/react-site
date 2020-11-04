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
      selected: 'rgba(118,118,118,1)',
      selectedOpacity: 0.7,
      hover: 'rgba(0,0,0,0.26)',
      hoverOpacity: 0.3,
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
    MuiButton: {
      variant: 'contained',
      color: 'secondary',
    },
  },
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
});

export { appTheme };
