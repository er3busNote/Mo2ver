import { useSnackbar, OptionsObject } from 'notistack';

// 알림 유틸리티 함수 정의
interface NotificationOptions {
	message: string;
	variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
	autoHideDuration?: number;
}

const useNotification = () => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const showNotification = (
		options: NotificationOptions,
		additionalOptions?: OptionsObject
	) => {
		const { message, variant = 'default', autoHideDuration = 3000 } = options;

		// 알림 추가
		const key = enqueueSnackbar(message, {
			variant,
			autoHideDuration,
			...additionalOptions,
		});

		// 특정 시간이 지난 후 알림 닫기
		if (autoHideDuration && autoHideDuration > 0) {
			setTimeout(() => {
				closeSnackbar(key);
			}, autoHideDuration);
		}
	};

	return {
		showNotification,
	};
};

export default useNotification;
