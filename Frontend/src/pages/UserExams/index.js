import React, { useEffect, useState } from 'react';
import API from '../../config/axios';
import { Card, Spin, Alert } from 'antd';

const UserExams = () => {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        API.get(`/users-quizzes/${userId}`)
            .then((response) => {
                setExams(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError('Không thể tải danh sách bài kiểm tra.');
                setLoading(false);
            });
    }, []);

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message={error} type="error" />;

    return (
        <div>
            <h1>Bài kiểm tra của bạn</h1>
            {exams.map((exam) => (
                <Card key={exam.id} title={exam.title}>
                    <p>Điểm: {exam.score}</p>
                </Card>
            ))}
        </div>
    );
};

export default UserExams;
