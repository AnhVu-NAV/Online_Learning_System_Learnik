import { Response } from 'express';
import { RequestCustom } from '../../../types/express.type';

export const getCategories = (req: RequestCustom, res: Response) => {
	res.status(200).json({
		message: 'Danh sách thể loại',
	});
};

export const getCategory = (req: RequestCustom, res: Response) => {
	res.status(200).json({
		message: 'Chi tiết thể loại',
	});
};

export const createCategory = (req: RequestCustom, res: Response) => {
	res.status(201).json({
		message: 'Tạo thể loại',
	});
};

export const updateCategory = (req: RequestCustom, res: Response) => {
	res.status(200).json({
		message: 'Sửa thể loại',
	});
};

export const deleteCategory = (req: RequestCustom, res: Response) => {
	res.status(200).json({
		message: 'Xóa thể loại',
	});
};