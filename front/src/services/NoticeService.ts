import { ActionCreatorsMapObject } from 'redux';
import {
	PageData,
	NoticeRequestData,
	NoticeInfoData,
	NoticePageData,
	NoticeData,
	CSRFData,
} from '@/types/api';
import { isEmpty, has } from 'lodash';

export default class NoticeService {
	constructor(private notice: ActionCreatorsMapObject) {}

	getNoticeDetail = async (
		noticeData: NoticeRequestData,
		csrfData?: CSRFData
	): Promise<NoticeInfoData> => {
		this.#validate(noticeData);
		return await this.notice.detail(noticeData, csrfData);
	};

	getNoticeInfo = async (code: string): Promise<NoticeData> => {
		return await this.notice.info(code);
	};

	getNoticePageList = async (page: number): Promise<NoticePageData> => {
		const pageData: PageData = { page, size: 12 };
		return await this.notice.list(pageData);
	};

	/**
	 * 공지사항 식별코드 유효성 검사
	 * @param noticeData 공지사항 식별코드
	 */
	#validate = (noticeData: NoticeRequestData) => {
		if (isEmpty(noticeData) || !has(noticeData, 'noticeNo'))
			throw new Error('No notice data');
	};
}
