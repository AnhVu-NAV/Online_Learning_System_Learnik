import express from 'express';
import config from './config/config';
import connectDB from './config/db';
import authRoutes from './modules/user/routes/auth.route';
import cors from 'cors';
import categoryRoutes from './modules/category/routes/category.route';
import quizzRoutes from './modules/quizz/routes/quizz.route';
import courseRoutes from './modules/course/routes/course.route';
import lessonRoutes from './modules/lesson/routes/lesson.route';
import reviewRoutes from './modules/review/routes/review.route';
import scheduleRoutes from './modules/schedule/routes/schedule.route';
import discussionRoutes from './modules/discussion/routes/discussion.route';
import usersQuizzesRoutes from './modules/users_quizzes/routes/users_quizzes.route';
import questionRoutes from './modules/question/routes/question.route';
import paymentRoutes from './modules/payment/routes/payment.route';
 // ✅ Cho phép tất cả frontend gọi API


const app = express();
const apiRouter = express.Router();
app.use(cors()); 
connectDB();

app.use(express.json());
app.use(cors());

// Đăng ký các routes với apiRouter
apiRouter.use('/auth', authRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/quizzes', quizzRoutes);
apiRouter.use('/courses', courseRoutes);
apiRouter.use('/lessons', lessonRoutes);
apiRouter.use('/reviews', reviewRoutes);
apiRouter.use('/schedules', scheduleRoutes);
apiRouter.use('/discussions', discussionRoutes);
apiRouter.use('/users-quizzes', usersQuizzesRoutes);
apiRouter.use('/questions', questionRoutes);
apiRouter.use('/payments', paymentRoutes);

// Áp dụng prefix global
app.use('/api/v1', apiRouter);

const PORT = config.PORT;

app.listen(PORT, () => {
	console.log(`Server đang được chạy trên: ${PORT}`);
});
