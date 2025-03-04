import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './src/config/db.ts';
import Course from './src/modules/course/models/course.model.ts';
import User from './src/modules/user/models/user.model.ts';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

// Dữ liệu mẫu
const courses = [
    {
        title: 'Lập trình Java cơ bản',
        description: 'Khóa học nhập môn lập trình Java từ cơ bản đến nâng cao.',
        imageUrl: 'https://example.com/java-course.jpg',
        price: 500000,
        duration: '10 tuần',
        category: 'Lập trình',
    },
    {
        title: 'Lập trình Web với ReactJS',
        description: 'Học cách xây dựng ứng dụng web hiện đại với ReactJS.',
        imageUrl: 'https://example.com/react-course.jpg',
        price: 600000,
        duration: '8 tuần',
        category: 'Web Development',
    },
    {
        title: 'Phát triển Backend với NodeJS',
        description: 'Tạo API mạnh mẽ với NodeJS và Express.',
        imageUrl: 'https://example.com/nodejs-course.jpg',
        price: 700000,
        duration: '12 tuần',
        category: 'Backend',
    },
    {
        title: 'Phát triển ứng dụng di động với Flutter',
        description: 'Xây dựng ứng dụng di động đa nền tảng với Flutter.',
        imageUrl: 'https://example.com/flutter-course.jpg',
        price: 750000,
        duration: '10 tuần',
        category: 'Mobile Development',
    },
    {
        title: 'Học Machine Learning với Python',
        description: 'Áp dụng Machine Learning vào các bài toán thực tế.',
        imageUrl: 'https://example.com/ml-course.jpg',
        price: 900000,
        duration: '14 tuần',
        category: 'AI & Data Science',
    },
    {
        title: 'Cyber Security - An ninh mạng',
        description: 'Khóa học bảo mật hệ thống và mạng máy tính.',
        imageUrl: 'https://example.com/security-course.jpg',
        price: 800000,
        duration: '12 tuần',
        category: 'Cyber Security',
    },
    {
        title: 'Lập trình C++ nâng cao',
        description: 'Khóa học giúp bạn thành thạo C++ để lập trình hệ thống.',
        imageUrl: 'https://example.com/cpp-course.jpg',
        price: 550000,
        duration: '9 tuần',
        category: 'Lập trình',
    },
    {
        title: 'Lập trình Python từ cơ bản đến nâng cao',
        description: 'Python là ngôn ngữ lập trình mạnh mẽ, dễ học và đa dụng.',
        imageUrl: 'https://example.com/python-course.jpg',
        price: 650000,
        duration: '10 tuần',
        category: 'Lập trình',
    },
    {
        title: 'Thiết kế UI/UX cho người mới bắt đầu',
        description: 'Học cách thiết kế giao diện người dùng trực quan và dễ dùng.',
        imageUrl: 'https://example.com/uiux-course.jpg',
        price: 720000,
        duration: '8 tuần',
        category: 'Design',
    },
    {
        title: 'Phát triển Web với Django',
        description: 'Tạo các ứng dụng web mạnh mẽ bằng Django & Python.',
        imageUrl: 'https://example.com/django-course.jpg',
        price: 680000,
        duration: '11 tuần',
        category: 'Web Development',
    },
    {
        title: 'Khai phá dữ liệu với SQL',
        description: 'Học cách truy vấn, phân tích dữ liệu với SQL.',
        imageUrl: 'https://example.com/sql-course.jpg',
        price: 600000,
        duration: '6 tuần',
        category: 'Data Science',
    },
    {
        title: 'DevOps cho người mới bắt đầu',
        description: 'Tìm hiểu về CI/CD, Docker, Kubernetes và quy trình DevOps.',
        imageUrl: 'https://example.com/devops-course.jpg',
        price: 850000,
        duration: '12 tuần',
        category: 'DevOps',
    },
    {
        title: 'Học lập trình Golang',
        description: 'Golang là một ngôn ngữ lập trình hiện đại và hiệu suất cao.',
        imageUrl: 'https://example.com/golang-course.jpg',
        price: 700000,
        duration: '9 tuần',
        category: 'Lập trình',
    },
    {
        title: 'Data Engineering - Xử lý dữ liệu lớn',
        description: 'Xây dựng hệ thống xử lý dữ liệu lớn với Spark và Kafka.',
        imageUrl: 'https://example.com/data-engineering-course.jpg',
        price: 950000,
        duration: '14 tuần',
        category: 'Data Science',
    },
    {
        title: 'Xây dựng chatbot AI với Python',
        description: 'Tạo chatbot AI thông minh với NLP và Python.',
        imageUrl: 'https://example.com/chatbot-course.jpg',
        price: 850000,
        duration: '10 tuần',
        category: 'AI & Data Science',
    },
];

// Người dùng mẫu
const users = [
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
    },
    {
        name: 'Học viên A',
        email: 'studentA@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'student',
    },
    {
        name: 'Học viên B',
        email: 'studentB@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'student',
    },
];

const importData = async () => {
    try {
        await Course.deleteMany();
        await User.deleteMany();

        const createdCourses = await Course.insertMany(courses);
        const createdUsers = await User.insertMany(users);

        console.log('✅ Dữ liệu đã được import thành công!');
        process.exit();
    } catch (error) {
        console.error('❌ Lỗi import dữ liệu:', error);
        process.exit(1);
    }
};

importData();
