import { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess, toastMessage } from '@store/index';
import {
	getAccessToken,
	getRolesFromToken,
	isAuthenticated,
} from '@utils/jwttoken';

const handleResponse = (response: AxiosResponse, dispatch: Dispatch) => {
	dispatch(tokenSuccess(response.data));
	return response.data;
};

const handleError = (error: AxiosError, dispatch: Dispatch) => {
	const { status } = error.response as AxiosResponse;
	if (status === 403) {
		if (isAuthenticated()) {
			const accessToken = getAccessToken();
			const roles = getRolesFromToken(accessToken);
			dispatch(
				toastMessage({
					message: '허용되지 않은 접근입니다 : ' + roles.join(',') + ' 권한',
					type: 'warning',
				})
			);
		}
	} else {
		dispatch(toastMessage({ message: error.message, type: 'error' }));
	}
	return error.response?.data;
};

export { handleResponse, handleError };
