import React from "react";
import { NavBarElement } from "../../elements";
import { useNavBar } from "./useNavBar";

export const NavBarContainer = () => {
  const { ...useNavBarProps } = useNavBar();
  return <NavBarElement {...useNavBarProps} />;
};
