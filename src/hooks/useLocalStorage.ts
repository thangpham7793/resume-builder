import React from "react";

// Adapted from https://lewislbr.dev/blog/add-dark-mode-react-typescript-styled-components/

export const useLocalStorage = <T>({
  key,
  initialValue,
}: {
  key: string;
  initialValue: T;
}): [T, (value: T) => void] => {
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
