import * as React from 'react';

type MobileContextValue = {
  isMobile: boolean;
};

const MobileContext = React.createContext<MobileContextValue>({
  isMobile: false,
});

export default MobileContext;
