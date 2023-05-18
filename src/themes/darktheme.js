import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      navbarcolor: '#0e131f',
      background : '#38405F',

    },
    typography: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '816px',
      fontWeight: 'normal',
      lineHeight: '24px',
      letterSpacing: 'normal',
    },
  }
});

export const ligthTheme = createTheme({
  type: 'light',
  theme: {
    colors: {}, // override dark theme colors
  }
});
// https://coolors.co/0e131f-38405f-59546c-8b939c-ff0035
// https://coolors.co/5c9ead-ffffff-326273-eeeeee-e39774