import React, { FC } from "react";
import { Theme, darkColor, theme as initialTheme } from "./theme";

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

const useLocalStorage = function <T>({
  key,
  initialValue,
}: {
  key: string;
  initialValue: T;
}): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (valueToStore: T) => {
    try {
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
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
