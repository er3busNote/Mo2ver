import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { AddressData } from '@/types/api';

interface AddressProps {
	address: ActionCreatorsMapObject;
}

const useAddressInfo = ({
	address,
}: AddressProps): [AddressData, Dispatch<SetStateAction<boolean>>] => {
	const [reload, setReload] = useState(false);
	const [data, setData] = useState<AddressData>(new Object() as AddressData);

	const fetchAndSetData = useCallback(async () => {
		const data = await address.info();
		setData(data);
		setReload(false);
	}, [reload]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setReload];
};

export default useAddressInfo;
