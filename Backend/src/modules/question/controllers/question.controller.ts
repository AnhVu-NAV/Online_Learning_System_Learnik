import { Request, Response, NextFunction } from 'express';
import Question from '../models/question.model';

export const createQuestion = async (req: Request, res: Response) => {
    try {
        const { questionText, answers, quizId, questionType } = req.body;

        const question = await Question.create({ questionText, answers, quizId, questionType });

        res.status(201).json({ message: 'Tạo câu hỏi thành công', question });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tạo câu hỏi', error });
    }
};

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách câu hỏi', error });
    }
};

export const updateQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const question = await Question.findByIdAndUpdate(id, updates, { new: true });

        if (!question) {
            res.status(404).json({ message: 'Không tìm thấy câu hỏi để cập nhật' });
            return;
        }

        res.status(200).json({ message: 'Cập nhật câu hỏi thành công', question });
    } catch (error) {
        next(error);
    }
};

export const deleteQuestion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);

        if (!question) {
            res.status(404).json({ message: 'Không tìm thấy câu hỏi để xóa' });
            return;
        }

        res.status(200).json({ message: 'Xóa câu hỏi thành công' });
    } catch (error) {
        next(error);
    }
};