import {useEffect} from 'react';

export const useEffectAsync = (effect: any, inputs: any) => {
  useEffect(() => {
    effect();
  }, inputs);
};
