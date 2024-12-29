import express from 'express';
import config from './config/config';
import connectDB from './config/db';
import categoryRoutes from './modules/category/routes/category.route';
import authRoutes from './modules/user/routes/auth.route';
import cors from 'cors';

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = config.PORT;

app.listen(PORT, () => {
	console.log(`Server đang được chạy trên: ${PORT}`);
});
