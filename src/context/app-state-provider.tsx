'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppStateContextType {
  isSummaryView: boolean;
  setIsSummaryView: (isSummary: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isSummaryView, setIsSummaryView] = useState(false);

  const value = {
    isSummaryView,
    setIsSummaryView,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
