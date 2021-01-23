import React from "react";
import { Theme } from "../../theme/theme";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeContext";

const ToggleLabel = styled("label")`
  --width: 40px;
  --height: calc(var(--width) / 2);
  --border-radius: calc(var(--height) / 2);

  display: inline-block;
  cursor: pointer;
`;

const ToggleFill = styled("div")<{ th: Theme; isDarkMode: boolean }>`
  position: relative;
  width: var(--width);
  height: var(--height);
  border-radius: var(--border-radius);
  background: ${({ th }) => th.color.primary.light};
  transition: background 0.2s;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: var(--height);
    width: var(--height);
    background: ${({ th, isDarkMode }) =>
      isDarkMode ? "#fff" : th.color.secondary.main};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: var(--border-radius);
    transition: transform 0.2s;
    transform: ${({ isDarkMode }) =>
      isDarkMode && `translateX(var(--height));`};
  }
`;

const ToggleInput = styled("input")<{ th: Theme }>`
  display: none;
`;

export const ThemeToggle = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  return (
    <ToggleLabel htmlFor="themeToggle">
      <ToggleInput
        th={theme}
        type="checkbox"
        onChange={toggleTheme}
        id="themeToggle"
      />
      <ToggleFill th={theme} isDarkMode={isDarkMode} id="toggle__fill" />
    </ToggleLabel>
  );
};
