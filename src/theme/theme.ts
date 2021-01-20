const baseFontSize = 1;

export const theme = {
  color: {
    primary: {
      main: "#e1f5fe",
      light: "#ffffff",
      dark: "#afc2cb",
      text: "#000000",
    },
    secondary: {
      main: "#90caf9",
      light: "#c3fdff",
      dark: "#5d99c6",
      text: "#000000",
    },
  },
  text: {
    fontSize: {
      xs: `${baseFontSize / 4}rem`,
      s: `${baseFontSize / 2}rem`,
      m: `${(baseFontSize * 3) / 4}rem`,
      xm: `${baseFontSize * 1.25}rem`,
      l: `${baseFontSize * 1.5}rem`,
      xl: `${baseFontSize * 25}rem`,
    },
  },
};
