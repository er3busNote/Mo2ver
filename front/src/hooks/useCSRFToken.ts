import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { CSRFData } from '../services/types';

interface CSRFTokenProps {
	member: ActionCreatorsMapObject;
}

const useCSRFToken = ({
	member,
}: CSRFTokenProps): [CSRFData, () => Promise<void>] => {
	const [data, setData] = useState<CSRFData>({ csrfToken: '' });

	const fetchAndSetData = useCallback(async () => {
		const data = await member.csrf();
		setData(data.data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, fetchAndSetData];
};

export default useCSRFToken;
