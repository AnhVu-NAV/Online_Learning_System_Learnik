import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import generateToken from '../../../utils/generateToken';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response): Promise<any> => {
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
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message: 'Email chưa tồn tại'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: 'Mật khẩu không trùng khớp'
            })
        }

        const token = generateToken(user);

        res.json({
            message: 'Đăng nhập thành công',
            token
        })
    } catch(err){
        console.error(err);
		res.status(500).send('Server error');
    }
}
