import { useState, Dispatch, SetStateAction } from 'react';
import {
	useQuery,
	keepPreviousData,
	QueryObserverResult,
	RefetchOptions,
} from '@tanstack/react-query';
import { ActionCreatorsMapObject } from 'redux';
import { ReviewPageData } from '@/types/api';
import ReviewService from '@services/ReviewService';

interface ReviewListProps {
	code: string;
	review: ActionCreatorsMapObject;
}

interface ReviewListResultProps {
	data?: ReviewPageData;
	setPage: Dispatch<SetStateAction<number>>;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<ReviewPageData, Error>>;
}

const useReviewPageList = ({
	review,
	code,
}: ReviewListProps): ReviewListResultProps => {
	const [page, setPage] = useState<number>(0);

	const service = new ReviewService(review);
	const { data, refetch } = useQuery<ReviewPageData>({
		queryKey: ['reviewList', code, page],
		queryFn: () => service.getReviewPageList(code, page),
		placeholderData: keepPreviousData,
		staleTime: 0,
		refetchOnWindowFocus: false,
	});

	return { data, setPage, refetch };
};

export default useReviewPageList;
