import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { AddressData } from '@/types/api';
import AddressService from '@services/AddressService';

interface AddressProps {
	address: ActionCreatorsMapObject;
}

const useAddressList = ({ address }: AddressProps) => {
	const service = new AddressService(address);
	return useQuery<Array<AddressData>>({
		queryKey: ['addressList'],
		queryFn: () => service.getAddressList(),
		staleTime: 60 * 1000,
	});
};

export default useAddressList;
