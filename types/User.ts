export interface UserType {
	userid: string;
	name: string;
	surname: string;
	birthday: Date;
	email: string;
}

export interface NewUserType extends UserType {
	password: string;
	passwordConfirmation?: string;
}
