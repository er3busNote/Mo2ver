import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
	QueryClient,
	QueryClientProvider,
	useQueryClient,
} from '@tanstack/react-query';
import Loading from '@components/backdrop/Loading';

const queryClient = new QueryClient();

interface QueryProviderProps {
	children: ReactNode;
}

const LoadingOverlay: FC = () => {
	const client = useQueryClient();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const unsub = client.getQueryCache().subscribe(() => {
			setLoading(client.isFetching() > 0);
		});
		return () => unsub();
	}, [client]);

	return <Loading open={loading} message="데이터를 불러오는 중..." />;
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
