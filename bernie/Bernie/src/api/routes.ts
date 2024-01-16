import {genius, spotify, bernie, traklist, youtube} from './internal';

export const routes = {
  genius: ({method, payload}: any) => genius({method, payload}),
  spotify: ({method, payload}: any) => spotify({method, payload}),
  bernie: ({method, payload}: any) => bernie({method, payload}),
  traklist: ({method, payload}: any) => traklist({method, payload}),
  youtube: ({method, payload}: any) => youtube({method, payload}),
};
