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

export default class EventService {
	constructor(private event: ActionCreatorsMapObject) {}

	getEventDetail = async (
		eventData: EventRequestData,
		csrfData?: CSRFData
	): Promise<EventInfoData> => {
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
}
