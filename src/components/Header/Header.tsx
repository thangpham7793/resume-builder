import React from "react";
import styled from "styled-components";
import { theme } from "../../theme/theme";

const HeaderWrapper = styled.div`
  background-color: ${theme.color.primary.main};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.color.primary.text};
`;

const TitleWrapper = styled.h1`
  font-size: ${theme.text.fontSize.m};
  pointer-events: none;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <TitleWrapper>Resume Builder</TitleWrapper>
    </HeaderWrapper>
  );
};
