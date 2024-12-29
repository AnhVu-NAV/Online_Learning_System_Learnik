import { Request, Response, NextFunction } from 'express';
import Quiz from '../models/quizz.model';
import Question from '../../question/models/question.model';

export const createQuizz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, description, questions, duration, level, category } = req.body;

        if (!questions || questions.length === 0) {
            res.status(400).json({ message: 'Danh sách câu hỏi không được để trống.' });
            return;
        }

        const quizz = await Quiz.create({
            title,
            description,
            questions,
            duration,
            level,
            category,
        });

        res.status(201).json({ message: 'Tạo đề thi thành công', quizz });
    } catch (error) {
        next(error);
    }
};

export const getQuizz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const quizz = await Quiz.findById(id).populate('questions');

        if (!quizz) {
            res.status(404).json({ message: 'Không tìm thấy đề thi' });
            return;
        }

        res.status(200).json(quizz);
    } catch (error) {
        next(error);
    }
};

export const updateQuizz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const quizz = await Quiz.findByIdAndUpdate(id, updates, { new: true });

        if (!quizz) {
            res.status(404).json({ message: 'Không tìm thấy đề thi để cập nhật' });
            return;
        }

        res.status(200).json({ message: 'Cập nhật đề thi thành công', quizz });
    } catch (error) {
        next(error);
    }
};

export const deleteQuizz = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const quizz = await Quiz.findByIdAndDelete(id);

        if (!quizz) {
            res.status(404).json({ message: 'Không tìm thấy đề thi để xóa' });
            return;
        }

        res.status(200).json({ message: 'Xóa đề thi thành công' });
    } catch (error) {
        next(error);
    }
};