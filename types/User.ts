export interface UserType {
	email: string;
	name: string;
	surname: string;
	birthday: Date;
}

export interface NewUserType extends UserType {
	password: string;
	passwordConfirmation?: string;
}

export interface UserSignType {
	email: string;
	password: string;
}
