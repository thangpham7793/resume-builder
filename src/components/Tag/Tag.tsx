import React from "react";
import styled from "styled-components";

const TagWrapper = styled("div")`
  display: flex;
  align-content: center;
`;

export const Tag = (props: { tag: string }) => {
  return (
    <TagWrapper>
      <p>{`#${props.tag}`}</p>
    </TagWrapper>
  );
};
