import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GET_HOT_100} from '../../../1.api';
import {useProvider} from '../../../3.stores';

export const useLandingCharts = () => {
  const {state} = useContext(useProvider);

  const [charts, setCharts] = useState([]);

  useEffect(() => {
    handleCharts();
  }, []);

  const handleCharts = () => {
    return axios
      .get(GET_HOT_100, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {})
      .catch(err => console.log('no work'));
  };

  return {
    charts,
  };
};
