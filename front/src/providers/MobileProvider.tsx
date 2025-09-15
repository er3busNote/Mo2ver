import React, {
	FC,
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';

interface MobileProviderProps {
	children: ReactNode;
}

const checkMobile = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	return /iphone|ipad|android|mobile|ipod/.test(userAgent);
};

const MobileContext = createContext(false);

const useIsMobile = () => useContext(MobileContext);
const useIsDesktop = () => !useIsMobile();

const MobileProvider: FC<MobileProviderProps> = ({ children }) => {
	const [isMobile, setIsMobile] = useState(checkMobile());

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				const uaCheck = checkMobile();
				setIsMobile(uaCheck);
			} else {
				setIsMobile(false);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // 초기 실행

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>
	);
};

export { MobileProvider, useIsMobile, useIsDesktop };
