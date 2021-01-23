import { IconType } from "react-icons/lib";
import React from "react";
import styled from "styled-components";

type IconProps = {
  icon: IconType;
};

const IconWrapper = styled.div`
  padding: 0.25rem;
  display: flex;
  align-items: center;
`;

export const Icon = ({ icon, ...props }: IconProps) => {
  const Icon = icon;
  return (
    <IconWrapper {...props}>
      <Icon />
    </IconWrapper>
  );
};
