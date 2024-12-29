import mongoose, { Document, Schema } from 'mongoose';

export interface IQuiz extends Document {
	title: string;
	description: string;
	courseId: mongoose.Schema.Types.ObjectId;
	questions: mongoose.Schema.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const quizSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
		questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
		duration: { type: Number, require: true },
		level: { type: Number, require: true },
		category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	},
	{ timestamps: true }
);

const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
export default Quiz;
