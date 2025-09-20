import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { AddressData } from '@/types/api';
import AddressService from '@services/AddressService';

interface AddressProps {
	address: ActionCreatorsMapObject;
}

const useAddressInfo = ({ address }: AddressProps) => {
	const service = new AddressService(address);
	return useQuery<AddressData>({
		queryKey: ['addressInfo'],
		queryFn: () => service.getAddressInfo(),
		staleTime: 60 * 1000,
		refetchOnWindowFocus: false,
	});
};

export default useAddressInfo;
