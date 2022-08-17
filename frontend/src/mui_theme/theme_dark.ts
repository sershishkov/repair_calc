import { createTheme } from '@mui/material/styles';

// Dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'black',
        },
      },
    },
  },
});

export default theme;
