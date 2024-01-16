import axios from "axios";
import { constants } from "../../../core";

const {
  api: {
    genius: { search },
  },
} = constants;

export const mineTRAK = (req: any, res: any) => {
  // const routeQuery = req.params.query;
  const {
    body: { query },
  } = req;
  // check query
  const route = search(query);
  // return res.json(route);

  return axios
    .get(route, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return res.json(response);
    })
    .catch((error) => {
      return res.json(error);
    });

  // genius
  // get media
  // get spotify
  // get musixmatch
  // get soundcloud
  // get apple muisc
};
