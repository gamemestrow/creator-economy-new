// contexts/PageStateContext.tsx
'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface PageStateContextType {
  pageState: Record<string, unknown>;
  setpageState: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const PageStateContext = createContext<PageStateContextType | null>(null);

export function PageStateProvider({ children }: { children: ReactNode }) {

const [pageState, setpageState] = useState<Record<string, unknown>>({});
  
  return (
    <PageStateContext.Provider
      value={{pageState, setpageState}}
    >
      {children}
    </PageStateContext.Provider>
  )
}

export function usePageState() {
  const ctx = useContext(PageStateContext)
  if (!ctx) throw new Error('usePageState must be used within a PageStateProvider')
  return ctx
}