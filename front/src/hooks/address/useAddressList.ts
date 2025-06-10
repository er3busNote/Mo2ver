import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { AddressData } from '@api/types';

interface AddressListProps {
	address: ActionCreatorsMapObject;
}

const useAddressList = ({ address }: AddressListProps): Array<AddressData> => {
	const [data, setData] = useState<Array<AddressData>>([]);

	const fetchAndSetData = useCallback(async () => {
		const data = await address.list();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useAddressList;
