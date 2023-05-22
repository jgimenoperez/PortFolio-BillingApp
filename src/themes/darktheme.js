import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      navbarcolor: '#38405F',
      background : '#0e131f',
      trollcolor: '#2BD0AC'
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
      colors: {
        navbarcolor: '#FFFFFF',
        background : '#B9CFD4',
      },
  }
});
// https://coolors.co/0e131f-38405f-59546c-8b939c-ff0035
// https://coolors.co/5c9ead-ffffff-326273-eeeeee-e39774