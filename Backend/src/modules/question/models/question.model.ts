import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
	questionText: string;
	answers: { answerText: string; isCorrect: boolean }[];
	quizId: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const questionSchema: Schema = new Schema(
	{
		questionText: { type: String, required: true },
		answers: [{ answerText: String, isCorrect: Boolean }],
		quizId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
		questionType: [
			{
				type: String,
				enum: ['single_choice', 'multiple_choice'],
				require: true,
			},
		],
	},
	{ timestamps: true }
);

const Question = mongoose.model<IQuestion>('Question', questionSchema);
export default Question;
