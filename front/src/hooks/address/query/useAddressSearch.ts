import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { JusoData } from '@/types/api';
import AddressService from '@services/AddressService';
import { isEmpty } from 'lodash';

interface AddressSearchProps {
	keyword: string;
	address: ActionCreatorsMapObject;
}

interface AddressSearchResultProps {
	data?: Array<JusoData>;
	setPage: Dispatch<SetStateAction<number>>;
}

const useAddressSearch = ({
	keyword,
	address,
}: AddressSearchProps): AddressSearchResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new AddressService(address);
	const { data } = useQuery<Array<JusoData>>({
		queryKey: ['addressSearch'],
		queryFn: () => service.getAddressSearch(page, keyword),
		enabled: !isEmpty(keyword),
		staleTime: 5 * 60 * 1000,
		placeholderData: keepPreviousData,
	});

	return { data, setPage };
};

export default useAddressSearch;
