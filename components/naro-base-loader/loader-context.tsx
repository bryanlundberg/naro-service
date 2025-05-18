"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NaroBaseLoader from './naro-base-loader';

interface LoaderContextType {
  hasShownLoader: boolean;
  setHasShownLoader: (value: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function useLoaderContext() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoaderContext must be used within a LoaderProvider');
  }
  return context;
}

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [hasShownLoader, setHasShownLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const pathname = usePathname();

  const isProjectsRoute = pathname?.startsWith('/app/projects');

  useEffect(() => {
    if (isProjectsRoute && !hasShownLoader && pathname !== null) {
      setShowLoader(true);
    }
  }, [isProjectsRoute, hasShownLoader, pathname]);

  const handleLoadingComplete = () => {
    setShowLoader(false);
    setHasShownLoader(true);
  };

  return (
    <LoaderContext.Provider value={{ hasShownLoader, setHasShownLoader }}>
      {showLoader ? <NaroBaseLoader onLoadingComplete={handleLoadingComplete} /> : children}
    </LoaderContext.Provider>
  );
}
