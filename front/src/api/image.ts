import { AxiosInstance } from 'axios';
import { urlFormat } from '../utils/format';

const image = (instance: AxiosInstance) => {
	return {
		// 이미지 매핑 API : <baseURL>/images/goods/*.* → <baseURL>/goods/image/*.*
		info: (imagefile: string, targetPath: string) => () =>
			urlFormat(instance.defaults.baseURL ?? '') +
			`${targetPath}/image?id=${imagefile}`,
	};
};

export default image;
