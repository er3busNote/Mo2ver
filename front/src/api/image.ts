import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess, toastMessage } from '../store/index';
import { CSRFData } from './types';
import { urlFormat } from '../utils/format';

const image = (instance: AxiosInstance) => {
	return {
		// 이미지 매핑 API : <baseURL>/file/image/*.*
		info: (imagefile: string) => () =>
			urlFormat(instance.defaults.baseURL ?? '') + `file/image?id=${imagefile}`,
		// 이미지 업로드 API : <baseURL>/file/upload
		upload: (formData: FormData, csrfData: CSRFData) => (dispatch: Dispatch) =>
			instance
				.post('file/upload', formData, {
					headers: {
						'X-XSRF-TOKEN': csrfData.csrfToken,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response: AxiosResponse) => {
					dispatch(tokenSuccess(response.data));
					return response.data;
				})
				.catch((error: AxiosError) => {
					dispatch(toastMessage({ message: error.message, type: 'error' }));
					return error.response?.data;
				}),
	};
};

export default image;
