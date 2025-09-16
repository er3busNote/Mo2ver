import { createContext, useContext } from 'react';

const MobileContext = createContext(false);

export const useIsMobile = () => useContext(MobileContext);
export const useIsDesktop = () => !useIsMobile();

export default MobileContext;
