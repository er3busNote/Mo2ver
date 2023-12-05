declare const REACT_APP_API_URL: string;
const _REACT_APP_API_URL = process.env.REACT_APP_API_URL || REACT_APP_API_URL;
console.log(_REACT_APP_API_URL);
export { _REACT_APP_API_URL as REACT_APP_API_URL };
