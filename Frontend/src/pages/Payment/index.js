import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axios';
import { Button, Spin, Alert } from 'antd';

const Payment = () => {
    const { courseId } = useParams();
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);
        const userId = localStorage.getItem('userId');

        try {
            const response = await axiosInstance.post('/payments/create-payment', {
                userId,
                courseId,
                amount: 100000, // Ví dụ: 100k
            });
            setQrCode(response.data.qrUrl);
        } catch (error) {
            setError('Lỗi khi tạo thanh toán!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Thanh toán khóa học</h1>
            <Button type="primary" onClick={handlePayment} disabled={loading}>
                {loading ? 'Đang tạo QR...' : 'Thanh toán bằng VietQR'}
            </Button>
            {loading && <Spin size="large" />}
            {error && <Alert message={error} type="error" />}
            {qrCode && <img src={qrCode} alt="QR Code" />}
        </div>
    );
};

export default Payment;
