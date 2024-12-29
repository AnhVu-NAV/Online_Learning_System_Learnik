import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { RequestCustom } from '../types/express.type';
import { UserPayload } from '../types/user.type';

const authMiddleware = (
	req: RequestCustom,
	res: Response,
	next: NextFunction
): any => {
	const token = req.headers['authorization'];

	if (!token) {
		return res.status(401).json({
			message: 'Vui lòng đăng nhập để thực hiện chức năng này',
		});
	}

	try {
		const decoded = jwt.verify(token, config.JWT_SECRET);

		req.user = decoded as UserPayload;
        next();
	} catch (error) {
		return res.status(403).json({
			message: 'Token không hợp lệ',
		});
	}
};

export default authMiddleware;