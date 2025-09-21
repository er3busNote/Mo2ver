import { ActionCreatorsMapObject } from 'redux';
import { GoodsData } from '@/types/api';

export default class RecommendService {
	constructor(private recommend: ActionCreatorsMapObject) {}

	getRecommendRankList = async (count: number): Promise<GoodsData[]> => {
		return await this.recommend.rank(count);
	};
}
