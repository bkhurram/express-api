const express = require('express');
const { body, validationResult } = require('express-validator');

const UserService = require('../services/UserService');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
	var userService = new UserService();
	var users = await userService.getAll();
	res.json(users);
});

router.post('/',
	body('password').isLength({ min: 5 }),
	body('passwordConfirmation').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password confirmation does not match password');
		}

		// Indicates the success of this synchronous custom validator
		return true;
	}),

	(req, res) => {

		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user = req.body;

		var userService = new UserService();
		userService.store(user);
		res.json();
	});

module.exports = router;
