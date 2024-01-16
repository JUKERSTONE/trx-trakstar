import { app } from "..";
import { useCloudFunctions } from "../hooks";

const { setTRAKFunction } = useCloudFunctions();

/** TRAK */
export const trx = {
  setTRAKFunction: app.get("/trak", setTRAKFunction),
};
