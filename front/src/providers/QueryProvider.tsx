import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
	QueryClient,
	QueryClientProvider,
	useQueryClient,
	useIsFetching,
} from '@tanstack/react-query';
import Loading from '@components/backdrop/Loading';

const queryClient = new QueryClient();

interface QueryProviderProps {
	children: ReactNode;
}

const LoadingOverlay: FC = () => {
	const isFetching = useIsFetching();
	return <Loading open={isFetching > 0} message="데이터를 불러오는 중..." />;
};

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<LoadingOverlay />
			{children}
		</QueryClientProvider>
	);
};

export default QueryProvider;
