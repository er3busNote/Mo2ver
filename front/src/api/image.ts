import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { handleResponse, handleError } from './common/handler';
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
						'X-XSRF-TOKEN': csrfData?.csrfToken,
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((response: AxiosResponse) => handleResponse(response, dispatch))
				.catch((error: AxiosError) => handleError(error, dispatch)),
	};
};

export default image;
