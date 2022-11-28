class UserModel {
	email: string;
	name: string;
	surname: string;
	birthday: Date;

	constructor(email:string, name:string, surname:string, birthday:Date) {
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.birthday = birthday;
	}
}

export default UserModel;
