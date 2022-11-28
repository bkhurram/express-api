import { UserType } from '../types/User';
import UserModel from './UserModel';

class SignUserModel {
	message: string;
	accessToken: string;
	user: UserType;

	constructor(token:string, email:string, name:string, surname:string, birthday:Date) {
		this.message = "Login successfull";
		this.accessToken = token;
		this.user = new UserModel(email, name, surname, birthday);
	}
}

export default SignUserModel;
