import { extendTheme } from '@mui/joy/styles';

export const lightTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
      },
    },
  },
});

export const darkTheme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        mode: 'dark',
      },
    },
  },
});