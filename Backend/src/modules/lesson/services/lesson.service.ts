import mongoose from 'mongoose';
import Lesson, { ILesson } from '../models/lesson.model';

export const createLesson = async (lessonData: Partial<ILesson>): Promise<ILesson> => {
    const lesson = new Lesson(lessonData);
    return await lesson.save();
};

export const getLessonById = async (id: string): Promise<ILesson | null> => {
    return await Lesson.findById(id);
};

export const getLessonsByCourseId = async (courseId: string): Promise<ILesson[]> => {
    return await Lesson.find({ courseId: new mongoose.Types.ObjectId(courseId) });
};

export const updateLesson = async (id: string, updateData: Partial<ILesson>): Promise<ILesson | null> => {
    return await Lesson.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteLesson = async (id: string): Promise<ILesson | null> => {
    return await Lesson.findByIdAndDelete(id);
};
