import React from "react";
import { IconType } from "react-icons/lib";

type ConvertIconProps = {
  icon: IconType;
};

export const ConvertIcon = ({ icon }: ConvertIconProps) => {
  const Icon = icon;
  return (
    <>
      <Icon />
    </>
  );
};
