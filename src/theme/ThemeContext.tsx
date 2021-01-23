import React, { FC } from "react";
import { Theme, darkColor, theme as initialTheme } from "./theme";

import { useLocalStorage } from "../hooks/useLocalStorage";

// Adapted from https://lewislbr.dev/blog/add-dark-mode-react-typescript-styled-components/

export type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

export const ThemeContext = React.createContext<ThemeContextProps>({
  theme: initialTheme,
  toggleTheme: () => null,
  isDarkMode: false,
});

export const useTheme = () => {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw Error("Must be inside ThemeContextProvider");
  return ctx;
};

type Props = {
  children: React.ReactNode;
};

export const ThemeContextProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage({
    key: "theme",
    initialValue: "light",
  });

  const makeTheme = (currentTheme: string) => {
    console.log(`Current theme is ${currentTheme}`);
    return currentTheme === "light"
      ? initialTheme
      : { ...initialTheme, color: darkColor };
  };

  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: makeTheme(theme),
        toggleTheme,
        isDarkMode: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
