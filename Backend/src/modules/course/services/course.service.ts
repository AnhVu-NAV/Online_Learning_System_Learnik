import Course, { ICourse } from '../models/course.model';

export async function createCourse(courseData: Partial<ICourse>) {
  return await Course.create(courseData);
}

export async function getAllCourses() {
  return await Course.find()
    .populate('instructorId')
    .populate('lessons')
    .populate('reviews')
    .populate('users');
}

export async function getCourseById(id: string) {
  return await Course.findById(id)
    .populate('instructorId')
    .populate('lessons')
    .populate('reviews')
    .populate('users');
}

export async function updateCourse(id: string, updateData: Partial<ICourse>) {
  return await Course.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
}

export async function deleteCourse(id: string) {
  return await Course.findByIdAndDelete(id);
}
