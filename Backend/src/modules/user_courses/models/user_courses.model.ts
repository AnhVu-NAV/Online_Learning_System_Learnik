import mongoose, { Document, Schema } from 'mongoose';

export interface IUserCourse extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  paymentStatus: string; // "pending", "completed", "failed"
  registrationDate: Date;
  paymentDate?: Date;
}

// Tạo phương thức tĩnh cho UserCourse
const userCourseSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
    registrationDate: { type: Date, default: Date.now },
    paymentDate: { type: Date },
  },
  { timestamps: true }
);

// Phương thức tĩnh tạo bản ghi đăng ký khóa học
userCourseSchema.statics.createUserCourse = async function (data: {
  userId: string;
  courseId: string;
  paymentStatus: string;
}) {
  const userCourse = new this({
    userId: data.userId,
    courseId: data.courseId,
    paymentStatus: data.paymentStatus,
  });
  return await userCourse.save(); // Lưu vào DB
};

// Phương thức tĩnh cập nhật trạng thái thanh toán
userCourseSchema.statics.updatePaymentStatus = async function (
  userId: string,
  courseId: string,
  status: string
) {
  return await this.findOneAndUpdate(
    { userId, courseId },
    { paymentStatus: status, paymentDate: new Date() },
    { new: true }
  );
};

const UserCourse = mongoose.model<IUserCourse>('UserCourse', userCourseSchema);

export default UserCourse;
