import { ActionCreatorsMapObject } from 'redux';
import {
	PageData,
	BannerRequestData,
	BannerGoodsInfoData,
	BannerImageInfoData,
	BannerPageData,
	CSRFData,
} from '@/types/api';

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
		return await this.banner.goodsDetail(bannerData, csrfData);
	};

	getBannerImagesDetail = async (
		bannerData: BannerRequestData,
		csrfData?: CSRFData
	): Promise<BannerImageInfoData> => {
		return await this.banner.imagesDetail(bannerData, csrfData);
	};

	getBannerPageList = async (page: number): Promise<BannerPageData> => {
		const pageData: PageData = { page, size: 12 };
		return this.banner.list(pageData);
	};
}
