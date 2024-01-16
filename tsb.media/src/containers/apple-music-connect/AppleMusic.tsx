import React from "react";
import { AppleMusicElement } from "../../elements";
import { useAppleMusic } from "./useAppleMusic";

export const AppleMusicConnectContainer = () => {
  const { ...useTransactProps } = useAppleMusic();
  return <AppleMusicElement {...useTransactProps} />;
};
