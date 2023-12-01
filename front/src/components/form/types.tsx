interface LoginFormValues {
	username: string;
	password: string;
}

interface SignupFormValues {
	username: string;
	password: string;
	repeat_password: string;
	email: string;
}

export type { LoginFormValues, SignupFormValues };
