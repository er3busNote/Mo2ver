import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { MemberData } from '@api/types';

interface MemberProps {
	member: ActionCreatorsMapObject;
}

const useMemberInfo = ({ member }: MemberProps): MemberData => {
	const [data, setData] = useState<MemberData>(new Object() as MemberData);

	const fetchAndSetData = useCallback(async () => {
		const data = await member.info();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useMemberInfo;
