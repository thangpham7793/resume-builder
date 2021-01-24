import { IconType } from "react-icons/lib";
import React from "react";
import styled from "styled-components";

type IconProps = {
  icon: IconType;
  isDisabled?: boolean;
};

const IconWrapper = styled.div`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Icon = ({ icon, isDisabled = false, ...props }: IconProps) => {
  const Icon = icon;
  return isDisabled ? null : (
    <IconWrapper {...props}>
      <Icon />
    </IconWrapper>
  );
};
