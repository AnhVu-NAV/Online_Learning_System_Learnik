import Question, { IQuestion } from '../models/question.model';
import mongoose from 'mongoose';
import { CustomError } from '../../../utils/custom-error';

export const createQuestion = async (questionData: Partial<IQuestion>): Promise<IQuestion> => {
    const question = new Question(questionData);
    return await question.save();
};

export const getQuestionsByQuiz = async (quizId: string): Promise<IQuestion[]> => {
    return await Question.find({ quizId: new mongoose.Types.ObjectId(quizId) });
};

export const getQuestionBank = async (filters: {
    questionType?: string;
    category?: string;
}): Promise<IQuestion[]> => {
    const query: any = {};
    if (filters.questionType) query.questionType = filters.questionType;
    if (filters.category) query.category = filters.category;
    
    return await Question.find(query).populate('quizId', 'title');
};

export const updateQuestion = async (
    id: string,
    updateData: Partial<IQuestion>
): Promise<IQuestion | null> => {
    return await Question.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteQuestion = async (id: string): Promise<IQuestion | null> => {
    return await Question.findByIdAndDelete(id);
};

export const validateQuestionAnswers = async (
    questionId: string,
    userAnswers: string[]
): Promise<boolean> => {
    const question = await Question.findById(questionId);
    if (!question) throw new CustomError('Không tìm thấy câu hỏi', 404);

    const correctAnswers = question.answers
        .filter(a => a.isCorrect)
        .map(a => a.answerText);

    return JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort());
};
