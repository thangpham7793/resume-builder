import React from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";

const HeaderWrapper = styled.div`
  background-color: ${theme.color.primary.main};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${theme.color.primary.text};
`;

const TitleWrapper = styled.h1`
  height: 64px;
  pointer-events: none;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <TitleWrapper>Resume Builder</TitleWrapper>
    </HeaderWrapper>
  );
};
