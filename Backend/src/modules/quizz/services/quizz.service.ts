import Quiz from '../models/quizz.model';
import Question from '../../question/models/question.model';

export const createQuizzService = async (data: any) => {
    const { title, description, questions, duration, level, category } = data;
    return await Quiz.create({ title, description, questions, duration, level, category });
};

export const getQuizzService = async (id: string) => {
    return await Quiz.findById(id).populate('questions');
};

export const updateQuizzService = async (id: string, updates: any) => {
    return await Quiz.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteQuizzService = async (id: string) => {
    return await Quiz.findByIdAndDelete(id);
};
