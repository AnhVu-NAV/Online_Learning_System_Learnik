import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
	title: string;
	description: string;
	instructorId: mongoose.Schema.Types.ObjectId;
	lessons: mongoose.Schema.Types.ObjectId[];
	imageUrl: string;  // ✅ Thêm trường này để lưu ảnh khóa học
	createdAt: Date;
	updatedAt: Date;
}

const courseSchema: Schema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
		resources: [{ type: String }],
		reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
		quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes' }],
		category: { type: String, required: true },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		imageUrl: { type: String, required: false },  // ✅ Trường mới để lưu đường dẫn ảnh
	},
	{ timestamps: true }
);

const Course = mongoose.model<ICourse>('Course', courseSchema);
export default Course;
