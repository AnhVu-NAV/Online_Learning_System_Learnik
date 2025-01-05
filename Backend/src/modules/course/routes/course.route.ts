import express from 'express';
import {
  handleCreateCourse,
  handleGetAllCourses,
  handleGetCourseById,
  handleUpdateCourse,
  handleDeleteCourse
} from '../controllers/course.controller';

const router = express.Router();

router.post('/', handleCreateCourse);
router.get('/', handleGetAllCourses);
router.get('/:id', handleGetCourseById);
router.put('/:id', handleUpdateCourse);
router.delete('/:id', handleDeleteCourse);

export default router;
