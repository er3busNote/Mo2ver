const isEmpty = (value: any) => {
	if (value === undefined || value === null) return true; // undefined 또는 null 체크
	if (typeof value === 'string' && value.trim() === '') return true; // 빈 문자열 체크
	if (typeof value === 'number' && isNaN(value)) return true; // NaN 체크
	if (Array.isArray(value) && value.length === 0) return true; // 빈 배열 체크
	if (typeof value === 'object' && Object.keys(value).length === 0) return true; // 빈 객체 체크
	return false;
};

const isNotEmpty = (value: any) => {
	return !isEmpty(value);
};

const isEmail =
	/^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isPassword =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export { isEmpty, isNotEmpty, isEmail, isPassword };
