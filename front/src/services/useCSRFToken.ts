import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CSRFData } from '@/types/api';

interface CSRFTokenProps {
	member: ActionCreatorsMapObject;
}

const useCSRFToken = ({ member }: CSRFTokenProps): CSRFData => {
	const [data, setData] = useState<CSRFData>({ csrfToken: '' });

	const fetchAndSetData = useCallback(async () => {
		const data = await member.csrf();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useCSRFToken;
