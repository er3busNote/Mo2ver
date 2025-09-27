import { ActionCreatorsMapObject } from 'redux';
import {
	EventRequestData,
	EventProductPageData,
	EventInfoData,
	EventPageData,
	EventData,
	PageData,
	CSRFData,
} from '@/types/api';
import { isEmpty, has } from 'lodash';

export default class EventService {
	constructor(private event: ActionCreatorsMapObject) {}

	getEventDetail = async (
		eventData: EventRequestData,
		csrfData?: CSRFData
	): Promise<EventInfoData> => {
		this.#validate(eventData);
		return await this.event.detail(eventData, csrfData);
	};

	getEventInfo = async (code: string): Promise<EventData> => {
		return await this.event.info(code);
	};

	getEventPageList = async (page: number): Promise<EventPageData> => {
		const pageData: PageData = { page, size: 12 };
		return await this.event.list(pageData);
	};

	getEventProductPageList = async (
		code: string,
		page: number
	): Promise<EventProductPageData> => {
		const pageData: PageData = { page, size: 12 };
		return await this.event.product(code, pageData);
	};

	/**
	 * 이벤트 식별코드 유효성 검사
	 * @param eventData 이벤트 식별코드
	 */
	#validate = (eventData: EventRequestData) => {
		if (isEmpty(eventData) || !has(eventData, 'eventNo'))
			throw new Error('No event data');
	};
}
