import React from "react";
import { MetaverseElement } from "../../elements";
import { useTSBM3DIA } from "./useTSBM3DIA";

export const TSBM3DIAContainer = () => {
  const { ...useTSBM3DIAProps } = useTSBM3DIA();
  return <MetaverseElement {...useTSBM3DIAProps} />;
};
