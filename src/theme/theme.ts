const baseFontSize = 1;

type Color = {
  main: string;
  light: string;
  dark: string;
  text: string;
};

type FontSize = {
  xs: string;
  ss: string;
  s: string;
  m: string;
  l: string;
  xl: string;
};

export type Theme = {
  boxShadow: string;
  color: {
    primary: Color;
    secondary: Color;
  };
  text: {
    fontSize: FontSize;
  };
};

export const darkColor = {
  primary: {
    main: "#022f43",
    light: "#181a1b",
    dark: "#181a1b",
    text: "#e8e6e3",
  },
  secondary: {
    main: "#064273",
    light: "#181a1b",
    dark: "#181a1b",
    text: "#e8e6e3",
  },
};

export const theme = {
  boxShadow:
    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
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
      ss: `${baseFontSize / 2}rem`,
      s: `${(baseFontSize * 3) / 4}rem`,
      m: `${baseFontSize}rem`,
      xm: `${baseFontSize * 1.25}rem`,
      l: `${baseFontSize * 1.5}rem`,
      xl: `${baseFontSize * 2.5}rem`,
    },
  },
};

const fadeInConfig = `0% {opacity:0; background: ${theme.color.primary.dark}}
100% {opacity:1;}`;

export const effect = {
  fadeIn: `
    animation: fadeIn ease 1s;
    -webkit-animation: fadeIn ease 1s;
    -moz-animation: fadeIn ease 1s;
    -o-animation: fadeIn ease 1s;
    -ms-animation: fadeIn ease 1s;
    
  @keyframes fadeIn {
    ${fadeInConfig}
  }
  
  @-moz-keyframes fadeIn {
    ${fadeInConfig}
  }
  
  @-webkit-keyframes fadeIn {
    ${fadeInConfig}
  }
  
  @-o-keyframes fadeIn {
    ${fadeInConfig}
  }
  
  @-ms-keyframes fadeIn {
    ${fadeInConfig}
  }`,
};
