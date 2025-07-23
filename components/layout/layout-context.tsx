"use client";
import React, { createContext, useContext, useState } from "react";

interface LayoutState {
  pageData: {};
  setPageData: React.Dispatch<React.SetStateAction<{}>>;
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      pageData: undefined,
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  pageData: any;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  pageData: initialPageData,
}) => {
  const [pageData, setPageData] = useState<{}>(initialPageData);

  return (
    <LayoutContext.Provider
      value={{
        pageData,
        setPageData,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
