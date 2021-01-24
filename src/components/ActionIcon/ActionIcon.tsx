import { Icon } from "../Icon/Icon";
import React from "react";
import { Theme } from "../../theme/theme";
import styled from "styled-components";
import { useTheme } from "../../theme/ThemeContext";

const ActionWrapper = styled("div")<{ th: Theme; isDarkMode: boolean }>`
  &:hover {
    background: ${(props) => props.th.color.primary.light};
    border-radius: 50%;
    border: 1px solid;
  }
`;

export type SnippetActionProps = {
  icon: () => JSX.Element;
  onClick: () => void;
};

export const ActionIcon = ({ icon, onClick }: SnippetActionProps) => {
  const { theme, isDarkMode } = useTheme();
  return (
    <ActionWrapper th={theme} isDarkMode={isDarkMode} onClick={onClick}>
      <Icon icon={icon} />
    </ActionWrapper>
  );
};
