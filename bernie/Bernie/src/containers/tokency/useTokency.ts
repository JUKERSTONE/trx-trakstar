import React, {useEffect, useState, useContext} from 'react';

export const useTokency = () => {
  const [selectedToken, setSelectedToken] = useState('JKX');
  return {
    selectedToken,
    setSelectedToken,
  };
};
