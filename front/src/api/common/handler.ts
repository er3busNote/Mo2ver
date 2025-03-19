import { AxiosResponse, AxiosError } from 'axios';
import { Dispatch } from '@reduxjs/toolkit';
import { tokenSuccess, toastMessage } from '@store/index';

const handleResponse = (response: AxiosResponse, dispatch: Dispatch) => {
	dispatch(tokenSuccess(response.data));
	return response.data;
};

const handleError = (error: AxiosError, dispatch: Dispatch) => {
	dispatch(toastMessage({ message: error.message, type: 'error' }));
	return error.response?.data;
};

export { handleResponse, handleError };
