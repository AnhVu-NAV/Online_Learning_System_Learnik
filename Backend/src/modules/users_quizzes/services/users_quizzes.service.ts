import mongoose from 'mongoose';
import UsersQuizzes, { IUsersQuizzes } from '../models/users_quizzes.model';

const createUserQuiz = async (data: {
    userId: mongoose.Types.ObjectId;
    quizId: mongoose.Types.ObjectId;
    answers: { questionId: mongoose.Types.ObjectId; answer: string }[];
    score: number;
    feedback?: string;
}): Promise<IUsersQuizzes> => {
    const userQuiz = new UsersQuizzes(data);
    return await userQuiz.save();
};

const getUserQuizzesByUserId = async (
    userId: mongoose.Types.ObjectId
): Promise<IUsersQuizzes[]> => {
    return await UsersQuizzes.find({ userId })
        .populate('quizId')
        .sort({ createdAt: -1 });
};

const getUserQuizById = async (
    id: mongoose.Types.ObjectId
): Promise<IUsersQuizzes | null> => {
    return await UsersQuizzes.findById(id)
        .populate('quizId')
        .populate('answers.questionId');
};

const getQuizResults = async (
    quizId: mongoose.Types.ObjectId
): Promise<IUsersQuizzes[]> => {
    return await UsersQuizzes.find({ quizId })
        .populate('userId')
        .sort({ score: -1 });
};

export default {
    createUserQuiz,
    getUserQuizzesByUserId,
    getUserQuizById,
    getQuizResults
};
