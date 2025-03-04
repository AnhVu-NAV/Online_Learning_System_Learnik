// user_courses.service.ts
import UserCourse, { IUserCourse } from '../models/user_courses.model';

interface UserCourseRequest {
  userId: string;
  courseId: string;
  paymentStatus: string;
}

// Tạo bản ghi mới khi người dùng đăng ký khóa học
const createUserCourse = async (data: UserCourseRequest): Promise<IUserCourse> => {
  const userCourse = new UserCourse({
    userId: data.userId,
    courseId: data.courseId,
    paymentStatus: data.paymentStatus,
  });

  return await userCourse.save(); // Lưu vào cơ sở dữ liệu
};

// Cập nhật trạng thái thanh toán của người dùng cho khóa học
const updatePaymentStatus = async (userId: string, courseId: string, status: string): Promise<IUserCourse | null> => {
  return await UserCourse.findOneAndUpdate(
    { userId, courseId },
    { paymentStatus: status, paymentDate: new Date() },
    { new: true } // Trả về bản ghi đã được cập nhật
  );
};

// Lấy danh sách khóa học của người dùng
const getUserCourses = async (userId: string): Promise<IUserCourse[]> => {
  return await UserCourse.find({ userId }).populate('courseId');
};

// Kiểm tra trạng thái thanh toán của người dùng đối với khóa học
const checkPaymentStatus = async (userId: string, courseId: string): Promise<IUserCourse | null> => {
  return await UserCourse.findOne({ userId, courseId });
};

export default {
  createUserCourse,
  updatePaymentStatus,
  getUserCourses,
  checkPaymentStatus,
};
