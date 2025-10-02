import { ActionCreatorsMapObject } from 'redux';
import { ReviewPageData, PageData } from '@/types/api';

export default class ReviewService {
	constructor(private review: ActionCreatorsMapObject) {}

	getReviewPageList = async (
		code: string,
		page: number
	): Promise<ReviewPageData> => {
		const pageData: PageData = { page, size: 6 };
		return await this.review.list(code, pageData);
	};
}
