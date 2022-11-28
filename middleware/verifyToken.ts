import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../entity/User';
import { CustomRequest } from '../types/CustomRequest';
import { JwtPayloadData } from '../types/JwtPayloadData';

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
	const apisecret = process.env.API_SECRET || '';

	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
		jwt.verify(req.headers.authorization.split(' ')[1], apisecret, function (err, decode) {
			if (err) {
				req.user = undefined;
			}
			const decodedToken = decode as JwtPayloadData;
			console.log(decodedToken);
			if (decodedToken?.id) {
				User.findOne({ _id: decodedToken.id })
					.exec((err, user) => {
						if (err) {
							res.status(500).send({ message: err });
						} else {
							req.user = user;
							next();
						}
					})
			} else {
				next();
			}
		});
	} else {
		req.user = undefined;
		next();
	}

};

export default verifyToken;
