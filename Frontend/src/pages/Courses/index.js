import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axios';
import { Card, Spin, Alert, Button, message } from 'antd';

const Courses = () => {
	const [courses, setCourses] = useState([]); // Đảm bảo giá trị khởi tạo là []
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axiosInstance.get('/courses');
				console.log("📌 API Response:", response.data); // Debug dữ liệu API

				// Kiểm tra nếu response.data không phải là mảng thì gán giá trị rỗng
				if (!Array.isArray(response.data)) {
					throw new Error("API trả về dữ liệu không hợp lệ");
				}

				setCourses(response.data);
			} catch (error) {
				console.error("🚨 Lỗi khi tải khóa học:", error);
				setError('Không thể tải danh sách khóa học.');
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	if (loading) return <Spin size="large" />;
	if (error) return <Alert message={error} type="error" showIcon />;

	return (
		<div style={{ padding: '20px' }}>
			<h1>Danh sách khóa học</h1>
			{courses.length === 0 ? (
				<Alert message="Hiện tại không có khóa học nào." type="info" showIcon />
			) : (
				courses.map((course) => (
					<Card
						key={course._id}
						title={course.title}
						cover={<img alt={course.title} src={course.imageUrl} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
						style={{ marginBottom: '20px' }}
					>
						<p><strong>Mô tả:</strong> {course.description}</p>
						<Button type="primary">
							Đăng ký khóa học
						</Button>
					</Card>
				))
			)}
		</div>
	);
};

export default Courses;
