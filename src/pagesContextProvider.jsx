import React, { createContext, useState, useEffect } from 'react';
import axios from './utils/api';

export const PagesContext = createContext();

export default function PagesContextProvider({ children }) {
  const maxSchedules = 20;
  const [register, setRegister] = useState([]);
  const fetchRegister = async () => {
    const response = await axios.get('./register');
    setRegister(response.data);
  };
  useEffect(() => {
    fetchRegister();
  }, []);
  return (
    <PagesContext.Provider value={[register, setRegister, maxSchedules]}>
      {children}
    </PagesContext.Provider>
  );
}
