declare const REACT_APP_API_URL: string;
let DEV_REACT_APP_API_URL = undefined;
let PROD_REACT_APP_API_URL = undefined;
if (process) {
	DEV_REACT_APP_API_URL = process.env.REACT_APP_API_URL;
} else {
	PROD_REACT_APP_API_URL = REACT_APP_API_URL;
}
const _REACT_APP_API_URL = DEV_REACT_APP_API_URL || PROD_REACT_APP_API_URL;
console.log(_REACT_APP_API_URL);
export { _REACT_APP_API_URL as REACT_APP_API_URL };
