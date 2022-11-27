import bcrypt from 'bcryptjs';

const saltRounds = 10;
// const passwordEnteredByUser = "mypass123"
// const hash = "$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K"

export const passwordCompare = async (plainPassword: string, hashPassword: string) => {

	const isMatch = await bcrypt.compare(plainPassword, hashPassword);
	if (!isMatch) {
		console.log("Password doesn't match!")
	} else {
		console.log("Password matches!")
	}

}

export const passwordCrypt = async (password: string) => {

	const salt = await bcrypt.genSalt(saltRounds);
	const hash = await bcrypt.hash(password, salt);
	console.log(hash)

	return hash;
	//$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
}
