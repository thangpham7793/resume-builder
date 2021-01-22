import React from "react";
import { IconType } from "react-icons/lib";
import styled from "styled-components";

type ConvertIconProps = {
  icon: IconType;
};

const IconWrapper = styled.div`
  text-align: center;
  padding: 0.25rem;
`;

export const ConvertIcon = ({ icon, ...props }: ConvertIconProps) => {
  const Icon = icon;
  return (
    <IconWrapper {...props}>
      <Icon />
    </IconWrapper>
  );
};
