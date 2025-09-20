import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { CSRFData } from '@/types/api';
import MemberService from '@services/MemberService';

interface MemberProps {
	member: ActionCreatorsMapObject;
}

const useCSRFToken = ({ member }: MemberProps) => {
	const service = new MemberService(member);
	return useQuery<CSRFData>({
		queryKey: ['csrfToken'],
		queryFn: () => service.getCSRFToken(),
		staleTime: 60 * 1000,
	});
};

export default useCSRFToken;
