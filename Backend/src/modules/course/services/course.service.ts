import mongoose from 'mongoose';
import Course, { ICourse } from '../models/course.model';
import { CustomError } from '../../../utils/custom-error';

// Tạo khóa học
export async function createCourse(courseData: Partial<ICourse>) {
  try {
    if (courseData.instructorId && !mongoose.Types.ObjectId.isValid(courseData.instructorId.toString())) {
      throw new CustomError('Instructor ID không hợp lệ', 400);
    }

    const newCourse = await Course.create(courseData);
    return newCourse;
  } catch (error) {
    console.error("🚨 Lỗi khi tạo khóa học:", error);
    throw new CustomError('Lỗi khi tạo khóa học', 500);
  }
}

// Lấy danh sách khóa học
export async function getAllCourses() {
  try {
    const courses = await Course.find()
      .populate('instructorId', 'name email') // Chỉ lấy name, email để tránh dữ liệu thừa
      .populate('lessons', 'title duration') 
      .populate('reviews', 'rating comment')
      .populate('users', 'name email');
    
    return courses;
  } catch (error) {
    console.error("🚨 Lỗi khi lấy danh sách khóa học:", error);
    throw new CustomError('Lỗi khi lấy danh sách khóa học', 500);
  }
}

// Lấy thông tin khóa học theo ID
export async function getCourseById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('ID khóa học không hợp lệ', 400);
    }

    const course = await Course.findById(id)
      .populate('instructorId', 'name email') 
      .populate('lessons', 'title duration') 
      .populate('reviews', 'rating comment')
      .populate('users', 'name email');

    if (!course) throw new CustomError('Không tìm thấy khóa học', 404);
    
    return course;
  } catch (error) {
    console.error("🚨 Lỗi khi lấy khóa học:", error);
    throw new CustomError('Lỗi khi lấy khóa học', 500);
  }
}

// Cập nhật khóa học
export async function updateCourse(id: string, updateData: Partial<ICourse>) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('ID khóa học không hợp lệ', 400);
    }

    if (updateData.instructorId && !mongoose.Types.ObjectId.isValid(updateData.instructorId.toString())) {
      throw new CustomError('Instructor ID không hợp lệ', 400);
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedCourse) throw new CustomError('Không tìm thấy khóa học', 404);
    
    return updatedCourse;
  } catch (error) {
    console.error("🚨 Lỗi khi cập nhật khóa học:", error);
    throw new CustomError('Lỗi khi cập nhật khóa học', 500);
  }
}

// Xóa khóa học
export async function deleteCourse(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError('ID khóa học không hợp lệ', 400);
    }

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) throw new CustomError('Không tìm thấy khóa học', 404);
    
    return deletedCourse;
  } catch (error) {
    console.error("🚨 Lỗi khi xóa khóa học:", error);
    throw new CustomError('Lỗi khi xóa khóa học', 500);
  }
}
