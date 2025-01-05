import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import authenticateRefreshToken from '../../../utils/authenticateRefreshToken';
import generateToken from '../../../utils/generateToken';
import User, { IUser } from '../models/user.model';
import generateRefreshToken from '../../../utils/generateRefreshToken';

export const registerUser = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { email, password, fullName } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				message: 'Người dùng đã tồn tại',
			});
		}

		user = new User({ email, password, fullName });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const token = generateToken(user);

		res.status(201).json({
			message: 'Đăng ký thành công',
			token,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Email chưa tồn tại' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({
				message: 'Mật khẩu không trùng khớp',
			});
		}

		const token = generateToken(user);
		const refreshToken = generateRefreshToken(user)

		res.json({
			message: 'Đăng nhập thành công',
			token,
			refreshToken
		});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
};

export const refreshToken = async (
	req: Request,
	res: Response
): Promise<any> => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({
			message: 'Refresh token is required',
		});
	}

	try {
		const decoded = authenticateRefreshToken(refreshToken) as IUser;
		const token = generateToken(decoded);

		res.json({
			token,
		});
	} catch (err) {
		console.error(err);
		res.status(403).send('Invalid or expired refresh token');
	}
};
