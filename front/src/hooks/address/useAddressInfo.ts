import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { AddressData } from '@api/types';

interface AddressProps {
	address: ActionCreatorsMapObject;
}

const useAddressInfo = ({ address }: AddressProps): AddressData => {
	const [data, setData] = useState<AddressData>(new Object() as AddressData);

	const fetchAndSetData = useCallback(async () => {
		const data = await address.info();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useAddressInfo;
