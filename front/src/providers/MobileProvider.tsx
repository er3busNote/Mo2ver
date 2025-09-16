import React, { FC, useEffect, useState, ReactNode } from 'react';
import MobileContext from '@context/MobileContext';

interface MobileProviderProps {
	children: ReactNode;
}

const checkMobile = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	return /iphone|ipad|android|mobile|ipod/.test(userAgent);
};

const MobileProvider: FC<MobileProviderProps> = ({ children }) => {
	const [isMobile, setIsMobile] = useState(checkMobile());

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setIsMobile(checkMobile());
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

export default MobileProvider;
