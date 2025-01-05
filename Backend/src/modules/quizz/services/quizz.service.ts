import Quiz, { IQuiz } from '../models/quizz.model';
import Question from '../../question/models/question.model';
import { CustomError } from '../../../utils/custom-error';
import mongoose from 'mongoose';

export const createQuizFromQuestionBank = async (data: {
    title: string;
    description: string;
    questionIds: string[];
    duration: number;
    level: number;
    category: string;
}): Promise<IQuiz> => {
    const questions = await Question.find({
        _id: { $in: data.questionIds.map(id => new mongoose.Types.ObjectId(id)) }
    });

    if (questions.length !== data.questionIds.length) {
        throw new CustomError('Một số câu hỏi không tồn tại', 400);
    }

    return await Quiz.create({
        ...data,
        questions: data.questionIds
    });
};

export const getQuizWithQuestions = async (id: string): Promise<any> => {
    const quiz = await Quiz.findById(id)
        .populate('questions')
        .populate('category');
    
    if (!quiz) throw new CustomError('Không tìm thấy bài kiểm tra', 404);
    return quiz;
};

export const getQuizzesByCategory = async (categoryId: string): Promise<IQuiz[]> => {
    return await Quiz.find({ category: categoryId })
        .populate('category', 'title')
        .select('title duration level');
};

export const getQuizLeaderboard = async (quizId: string): Promise<any[]> => {
    return await Quiz.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(quizId) } },
        {
            $lookup: {
                from: 'usersquizzes',
                localField: '_id',
                foreignField: 'quizId',
                as: 'attempts'
            }
        },
        { $unwind: '$attempts' },
        {
            $lookup: {
                from: 'users',
                localField: 'attempts.userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: '$user' },
        {
            $project: {
                'user.fullName': 1,
                'attempts.score': 1,
                'attempts.createdAt': 1
            }
        },
        { $sort: { 'attempts.score': -1 } },
        { $limit: 10 }
    ]);
};
