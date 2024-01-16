import { app } from "..";
import { useCloudFunctions } from "../hooks";

const { setTRAKFunction } = useCloudFunctions();

/** TRAK */
export const bernie = {
  setTRAKFunction: app.get("/trak", setTRAKFunction),
};
