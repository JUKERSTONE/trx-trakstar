import React from "react";
import { StacksPortalElement } from "../../elements";
import { useNewStacksAccount } from "./useNewStacksAccountContainer";

export const NewStacksAccountContainer = () => {
  const { ...useStacksPortalProps } = useNewStacksAccount();
  return <StacksPortalElement {...useStacksPortalProps} />;
};
