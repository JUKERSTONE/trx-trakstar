import {createContext} from 'react';

import {initialState} from '../redux/reducer';

export const useProvider = createContext(initialState as any);
