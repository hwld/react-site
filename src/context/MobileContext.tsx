import * as React from 'react';
import { useContext } from 'react';

type MobileContextValue = {
  isMobile: boolean;
};

const MobileContext = React.createContext<MobileContextValue>({
  isMobile: false,
});

export const MobileContextProvider: React.FC<{ value: MobileContextValue }> = ({
  children,
  value,
}) => {
  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
};

export const useMobileContext = () => useContext(MobileContext);
