import { ActionCreatorsMapObject } from 'redux';
import {
	PageData,
	BannerRequestData,
	BannerGoodsInfoData,
	BannerImageInfoData,
	BannerPageData,
	CSRFData,
} from '@/types/api';
import { isEmpty, has } from 'lodash';

export default class BannerService {
	constructor(private banner: ActionCreatorsMapObject) {}

	getBannerDisplay = async (): Promise<
		Record<string, Record<string, Array<object>>>
	> => {
		return await this.banner.display();
	};

	getBannerGoodsDetail = async (
		bannerData: BannerRequestData,
		csrfData?: CSRFData
	): Promise<BannerGoodsInfoData> => {
		if (
			isEmpty(bannerData) ||
			!has(bannerData, 'bannerNo') ||
			!has(bannerData, 'displayTemplateCode')
		)
			throw new Error('No banner data');
		return await this.banner.goodsDetail(bannerData, csrfData);
	};

	getBannerImagesDetail = async (
		bannerData: BannerRequestData,
		csrfData?: CSRFData
	): Promise<BannerImageInfoData> => {
		if (
			isEmpty(bannerData) ||
			!has(bannerData, 'bannerNo') ||
			!has(bannerData, 'displayTemplateCode')
		)
			throw new Error('No banner data');
		return await this.banner.imagesDetail(bannerData, csrfData);
	};

	getBannerPageList = async (page: number): Promise<BannerPageData> => {
		const pageData: PageData = { page, size: 12 };
		return await this.banner.list(pageData);
	};
}
