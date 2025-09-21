import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { CodeData, CSRFData } from '@/types/api';
import CodeService from '@services/CodeService';

interface GroupCodeProps {
	code: ActionCreatorsMapObject;
	groupCodelist: string[];
	csrfData?: CSRFData;
}

const useGroupCodeList = ({
	code,
	groupCodelist,
	csrfData,
}: GroupCodeProps) => {
	const service = new CodeService(code);
	return useQuery<Record<string, CodeData[]>>({
		queryKey: ['groupCodeList', groupCodelist, csrfData?.csrfToken],
		queryFn: () => service.getCodeList(groupCodelist, csrfData),
		enabled: groupCodelist.length > 0,
		placeholderData: keepPreviousData,
	});
};

export default useGroupCodeList;
