import {
	useEffect,
	useState,
	useCallback,
	Dispatch,
	SetStateAction,
} from 'react';
import { ActionCreatorsMapObject } from 'redux';
import { PageData, ReviewPageData } from '@api/types';

interface ReviewListProps {
	code: string;
	review: ActionCreatorsMapObject;
}

const useReviewPageList = ({
	review,
	code,
}: ReviewListProps): [
	ReviewPageData,
	Dispatch<SetStateAction<number>>,
	Dispatch<SetStateAction<boolean>>
] => {
	const [page, setPage] = useState(0);
	const [reload, setReload] = useState(false);
	const [data, setData] = useState<ReviewPageData>(
		new Object() as ReviewPageData
	);

	const fetchAndSetData = useCallback(async () => {
		const pageData: PageData = {
			page: page,
			size: 12,
		};
		const data = await review.list(code, pageData);
		setData(data);
		setReload(false);
	}, [page, reload]);

	useEffect(() => {
		fetchAndSetData();
	}, [fetchAndSetData]);

	return [data, setPage, setReload];
};

export default useReviewPageList;
