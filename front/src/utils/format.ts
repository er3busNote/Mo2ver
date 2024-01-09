const urlFormat = (url: string) => {
	if (url.charAt(url.length - 1) !== '/') {
		return url + '/';
	} else {
		return url;
	}
};

export { urlFormat };
