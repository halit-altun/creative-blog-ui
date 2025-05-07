import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projectCount, setProjectCount] = useState(2);
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