"use client"
import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface AdminContextProps {
  activeTab: string;
  changeTab: (tabName: string) => void;

}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState('Actividad8');


  const changeTab: AdminContextProps['changeTab'] = (tabName) => {
    setActiveTab(tabName);
    // Add logic to set hideSidebar based on the active tab

  };

  return (
    <AdminContext.Provider value={{ activeTab, changeTab}}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = (): AdminContextProps => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
