import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';

const recommend = (instance: AxiosInstance) => {
	return {
		// 추천 상품 API : <baseURL>/recommend/rank
		rank: (count: number) => (dispatch: Dispatch) =>
			instance
				.get(`recommend/rank/${count}`)
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default recommend;
