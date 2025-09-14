import { useEffect, useState, useCallback } from 'react';
import { ActionCreatorsMapObject } from 'redux';

interface BannerListProps {
	banner: ActionCreatorsMapObject;
}

const useBannerDisplayList = ({
	banner,
}: BannerListProps): Record<string, Record<string, Array<object>>> => {
	const [data, setData] = useState<
		Record<string, Record<string, Array<object>>>
	>({});

	const fetchAndSetData = useCallback(async () => {
		const data = await banner.display();
		setData(data);
	}, []);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return data;
};

export default useBannerDisplayList;
