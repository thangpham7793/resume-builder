import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background-color: blue;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const TitleWrapper = styled.h1`
  height: 64px;
  pointer-events: none;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <TitleWrapper>Project Management Board</TitleWrapper>
    </HeaderWrapper>
  );
};
