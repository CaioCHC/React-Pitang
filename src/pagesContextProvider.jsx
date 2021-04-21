import React, { createContext, useState, useEffect } from 'react';
import axios from './utils/api';

export const PagesContext = createContext();

export default function PagesContextProvider({ children }) {
  const maxSchedules = 20;
  const [register, setRegister] = useState([]);
  const fetchRegister = async () => {
    try {
      const response = await axios.get('./register');
      setRegister(response.data);
    } catch (error) { console.logo(error.message); }
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
