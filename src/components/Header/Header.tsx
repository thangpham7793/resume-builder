import React from "react";
import { Theme } from "../../theme/theme";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeContext";

const HeaderWrapper = styled("div")<{ th: Theme }>`
  background-color: ${({ th }) => th.color.primary.main};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ th }) => th.color.primary.text};
`;

const TitleWrapper = styled("h1")<{ th: Theme }>`
  font-size: ${({ th }) => th.text.fontSize.m};
  pointer-events: none;
`;

export const Header = () => {
  const { theme } = useTheme();
  return (
    <HeaderWrapper th={theme}>
      <TitleWrapper th={theme}>Resume Builder</TitleWrapper>
    </HeaderWrapper>
  );
};
