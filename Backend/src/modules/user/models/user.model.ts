import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
	email: string;
	password: string;
	fullName: string;
	role: string; // student, teacher, admin
	courses: mongoose.Schema.Types.ObjectId[];
	avatar: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const userSchema: Schema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		fullName: { type: String, required: true },
		role: {
			type: String,
			enum: ['student', 'teacher', 'admin'],
			default: 'student',
		},
		courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
		avatar: { type: String },
	},
	{ timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
