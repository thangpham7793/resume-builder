import { IconType } from "react-icons/lib";
import React from "react";
import styled from "styled-components";

type IconProps = {
  icon: React.ReactNode;
  isDisabled?: boolean;
};

const IconWrapper = styled.div<{ isDisabled: boolean }>`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
`;

export const Icon = ({ icon, isDisabled = false, ...props }: IconProps) => {
  return (
    <IconWrapper isDisabled={isDisabled} {...props}>
      {icon}
    </IconWrapper>
  );
};
