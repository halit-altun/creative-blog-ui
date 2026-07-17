import React, { createContext, useState, useContext } from 'react';
import { PROJECT_COUNT } from '../data/projects';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projectCount, setProjectCount] = useState(PROJECT_COUNT);
  const [blogCount, setBlogCount] = useState(0);

  return (
    <AppContext.Provider value={{ projectCount, blogCount, setProjectCount, setBlogCount }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
