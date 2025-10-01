import { ActionCreatorsMapObject } from 'redux';
import {
	PageData,
	NoticeRequestData,
	NoticeInfoData,
	NoticePageData,
	NoticeData,
	CSRFData,
} from '@/types/api';

export default class NoticeService {
	constructor(private notice: ActionCreatorsMapObject) {}

	getNoticeDetail = async (
		noticeData: NoticeRequestData,
		csrfData?: CSRFData
	): Promise<NoticeInfoData> => {
		return await this.notice.detail(noticeData, csrfData);
	};

	getNoticeInfo = async (code: string): Promise<NoticeData> => {
		return await this.notice.info(code);
	};

	getNoticePageList = async (page: number): Promise<NoticePageData> => {
		const pageData: PageData = { page, size: 12 };
		return await this.notice.list(pageData);
	};
}
