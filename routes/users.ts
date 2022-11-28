import express from 'express';
import { body, validationResult } from 'express-validator';
import { HttpCode } from '../models/HttpCode';
import UserService from '../services/UserService';
import { NewUserType, UserSignType } from '../types/User';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
	var userService = new UserService();
	var users = await userService.getAll();
	console.info("Total users:", users.length);
	res.json(users);
});

router.post('/signup',
	body('password').isLength({ min: 5 }),
	body('passwordConfirmation').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}

		// Indicates the success of this synchronous custom validator
		return true;
	}),

	async (req, res) => {

		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user:NewUserType = req.body;

		var userService = new UserService();
		await userService.store(user);
		res.status(HttpCode.CREATED).json({
			message: "User Registered successfully"
		});

	}
);

router.post('/signin',
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
	async (req, res) => {
		const sign: UserSignType = req.body;
		var userService = new UserService();
		const signUserModel = await userService.signin(sign);
		res.status(200).json(signUserModel);
	}
);

export default router;
