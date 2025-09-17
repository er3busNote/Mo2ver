import { useQuery } from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { MemberData } from '@/types/api';
import MemberService from '@services/MemberService';

interface MemberProps {
	member: ActionCreatorsMapObject;
}

const useMemberInfo = ({ member }: MemberProps) => {
	const service = new MemberService(member);
	return useQuery<MemberData>({
		queryKey: ['memberInfo'],
		queryFn: () => service.getMemberInfo(),
		staleTime: 1000 * 60,
	});
};

export default useMemberInfo;
