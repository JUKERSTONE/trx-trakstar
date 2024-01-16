import { app } from "..";
import { useCloudFunctions } from "../hooks";

const { setTRAKFunction } = useCloudFunctions();

/** TRAK */
export const t4a = {
  setTRAKFunction: app.get("/trak", setTRAKFunction),
};
